/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CloseOutlined, DownOutlined, UploadOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  DatePicker,
  Dropdown,
  Image,
  Modal,
  Segmented,
  Select,
  Space,
} from "antd";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { AuthApi } from "@/api";
import { LandlordApi } from "@/api/LandlordApi";
import { InputText } from "@/components/molecules/InputText";
import { User } from "@/store/User/User";

const LandlordPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [cities, setCities] = useState<{ id: number; name: string }[]>([]);
  const [city, setCity] = useState<number>(0);
  const [area, setArea] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [rooms, setRooms] = useState<number>(1);
  const [baths, setBaths] = useState<number>(1);
  const [apartments, setApartments] = useState<any[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [apartmentId, setApartmentId] = useState<number>(0);
  const [services, setServices] = useState<any[]>([]);
  const [modalPrice, setModalPrice] = useState<number>(0);
  const [modalDescription, setModalDescription] = useState<string>("");
  const [modalDate, setModalDate] = useState<string>("");
  const [modalServicesId, setModalServicesId] = useState<number[]>([]);
  const [modalCleanMode, setModalCleanMode] = useState<
    "STANDARD" | "DEEPCLEAN"
  >("STANDARD");

  useEffect(() => {
    LandlordApi.getCities().then((response: AxiosResponse) => {
      setCities(response?.data);
      setCity(response?.data[0]?.id);
    });
    LandlordApi.getServices().then((response: AxiosResponse) => {
      setServices(response?.data);
    });
  }, []);
  useEffect(() => {
    if (!User.auth || User.role !== "LANDLORD") {
      if (localStorage.getItem("access_token")) {
        AuthApi.getUserInfo()
          .then((response) => {
            User.assignUser({
              auth: true,
              surname: response?.data?.lastname,
              name: response?.data?.firstname,
              email: response?.data?.email,
              role: response?.data?.role,
              iin: response?.data?.iin,
            });
            if (response?.data?.role !== "LANDLORD") {
              router.push("/cleaner");
            }
          })
          .catch(() => {
            router?.push("login");
          });
      } else {
        router.push("/login");
      }
    }
  }, [router]);
  //@ts-ignore
  const items: MenuProps["items"] = useMemo(
    () =>
      cities.map((city) => ({
        key: city?.id,
        label: city?.name,
        value: city?.id,
        onClick: (value: { key: number }) => setCity(Number(value?.key)),
      })),
    [cities]
  );
  useEffect(() => {
    LandlordApi.getMyApartments().then((response: AxiosResponse) => {
      console.log(response.data, "apartments");
      setApartments(response?.data);
    });
  }, []);

  const inputRef = useRef<HTMLInputElement>(null);
  const handleAddApartment = useCallback(async () => {
    const urls: string[] = [];
    //@ts-ignore
    const promises: Promise<unknown>[] = [];
    files.forEach((file) => {
      let body = new FormData();
      body.set("key", "db91b7fca6802f82b4b5aa5462e5b0d4" ?? "");
      body.append("image", file ?? "");
      body.append("name", file.name ?? "");
      promises.push(
        axios.post(
          "https://api.imgbb.com/1/upload?key=" +
            "db91b7fca6802f82b4b5aa5462e5b0d4",
          body
        )
      );
    });
    Promise.all(promises)
      .then((responses) => {
        responses.forEach((response) => {
          // @ts-ignore
          urls.push(response?.data?.data?.url);
        });
      })
      .then(() => {
        LandlordApi.addApartment(
          city,
          address,
          area,
          rooms,
          description,
          urls,
          baths
        ).then((response: AxiosResponse) => {
          console.log(response?.data);
        });
      });
  }, [address, area, baths, city, description, files, rooms]);

  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url(/landlordBackgroundCurves.png)",
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% 200%",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/backgroundInterior.png)",
          backgroundSize: "100% 100%",
          backdropFilter: "blur(5px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "50%",
          zIndex: -1,
          filter: "blur(5px)",
        }}
      />
      <div className="mx-32 flex h-fit justify-between py-16 text-Thin40">
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          HOME
        </div>
        <div>SERVICE</div>
        <div>CONTACT</div>
        <div
          className="cursor-pointer"
          onClick={() => {
            User.logout();
            router.push("/");
          }}
        >
          Log out
        </div>
      </div>
      <div className="mx-32">
        <Image src="/apartXlogo.svg" width={331} preview={false} alt="logo" />
        <div className="text-Bold20">
          Order apartment cleaning in a few clicks
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-10 flex h-fit w-1/2 flex-col rounded-lg bg-white/80 p-10 shadow-sm shadow-gray">
          <div className="mb-10 flex justify-center text-Regular28">
            Заполните данные вашего дома
          </div>
          <div className="flex w-full items-center justify-start">
            <div className="flex items-center justify-start">
              <div>
                <Dropdown menu={{ items }}>
                  <Space className="mr-4 flex items-center rounded-lg border-2 border-solid border-primaryBlue bg-white p-3 text-Bold20">
                    {city
                      ? cities?.find((cityFind) => cityFind?.id === city)?.name
                      : "Город"}{" "}
                    <DownOutlined className="text-primaryBlue" />
                  </Space>
                </Dropdown>
              </div>
              <div className="w-20">
                <InputText
                  label="м2"
                  name="квадратура"
                  value={String(area)}
                  onChange={(event) => {
                    setArea(Number(event.target.value));
                  }}
                  wrapperClassName="bg-white rounded-2xl"
                />
              </div>
            </div>
            <div className="ml-4 flex justify-center">
              <Segmented
                options={[
                  { label: "Квартира", value: "apartment" },
                  { label: "Дом", value: "house" },
                ]}
                className="h-10"
                size="large"
              />
            </div>
            <div
              onClick={() => {
                inputRef.current?.click();
              }}
              className="ml-4 flex cursor-pointer items-center rounded-xl border border-solid border-gray bg-white p-3"
            >
              <UploadOutlined />
              <span className="ml-2 text-Regular16">Загрузить фото</span>
            </div>
            <input
              ref={inputRef}
              className="hidden"
              type="file"
              accept=".jpg,.jpeg,.png"
              multiple
              onChange={(event) => {
                const localFiles: File[] = [];
                // @ts-ignore
                for (let localFile of event?.target?.files) {
                  localFiles.push(localFile);
                }
                setFiles((prev) => [...prev, ...localFiles]);
              }}
            />
            <div className="ml-2">
              {files?.map((file) => (
                <div key={file?.name}>
                  {file.name}{" "}
                  <CloseOutlined
                    onClick={() => {
                      setFiles((prev) =>
                        prev.filter(
                          (filterFile) => filterFile.name !== file.name
                        )
                      );
                    }}
                    className="text-red"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <div className="mr-2 mt-4 w-1/2">
              <InputText
                wrapperClassName="bg-white rounded-2xl"
                inputClassName="bg-white"
                label="Адрес"
                name="address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </div>
            <div className="ml-2 mt-4 w-1/2">
              <InputText
                wrapperClassName="bg-white rounded-2xl"
                inputClassName="bg-white"
                label="Описание"
                name="description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex justify-between rounded-2xl border border-solid border-lightGray bg-white p-3">
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setRooms((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    } else {
                      return prev;
                    }
                  });
                }}
              >
                -
              </div>
              <div className="mx-4">{rooms}-комнатная</div>
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setRooms((prev) => prev + 1);
                }}
              >
                +
              </div>
            </div>
            <div className="ml-4 flex justify-between rounded-2xl border border-solid border-lightGray bg-white p-3">
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setBaths((prev) => {
                    if (prev > 1) {
                      return prev - 1;
                    } else {
                      return prev;
                    }
                  });
                }}
              >
                -
              </div>
              <div className="mx-4">{baths}-санузел</div>
              <div
                className="cursor-pointer px-2"
                onClick={() => {
                  setBaths((prev) => prev + 1);
                }}
              >
                +
              </div>
            </div>
            <Button
              className="ml-4 h-10 w-full rounded-xl bg-primaryBlue text-white"
              onClick={handleAddApartment}
            >
              Добавить
            </Button>
          </div>
        </div>
      </div>
      <div className="mb-20 flex w-full justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          {apartments?.map((apartment) => (
            <div
              key={apartment?.id}
              className="mt-10 flex h-fit w-1/2 flex-col rounded-lg bg-white/80 p-10 shadow-sm shadow-gray"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Image
                    alt="apartment"
                    src={apartment?.imageUrls[0] ?? ""}
                    width={100}
                    preview={false}
                  />
                  <div className="ml-4">
                    <div>
                      city:
                      {
                        (cities ?? [])?.find(
                          (cityFind) => cityFind?.id === apartment?.id
                        )?.name
                      }
                    </div>
                    <div>address: {apartment?.address}</div>
                    <div>
                      rooms: {apartment?.roomNumber}, baths:{" "}
                      {apartment?.bathNumber}
                    </div>
                    <div>description: {apartment?.description}</div>
                  </div>
                </div>
                <Button
                  className="h-10 w-32 rounded-xl bg-primaryBlue text-white"
                  onClick={() => {
                    setModal(true);
                    setApartmentId(apartment?.id ?? "");
                  }}
                >
                  Clean
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        open={modal}
        onCancel={() => {
          setModal(false);
        }}
        onOk={() => {
          LandlordApi.postOrder(
            apartmentId,
            modalDescription,
            modalServicesId,
            modalDate,
            modalCleanMode,
            modalPrice
          ).then(() => {
            enqueueSnackbar("Заказ успешно создан", {
              variant: "success",
            });
          });
          setModal(false);
        }}
      >
        <div className="mt-10">
          <div className="mb-4 text-Bold20">Вызвать клининг</div>
          <InputText
            label="price"
            name="price"
            onChange={(event) => {
              setModalPrice(parseInt(event.target.value));
            }}
          />
          <InputText
            wrapperClassName={"my-2"}
            label="description"
            name="description"
            onChange={(event) => {
              setModalDescription(event.target.value);
            }}
          />
          <DatePicker
            onChange={(date) => {
              setModalDate(date?.toDate()?.toISOString() ?? "");
            }}
          />
          <Select
            mode="multiple"
            allowClear
            className="my-4 w-full"
            options={services?.map((service) => ({
              label: `${service?.name} - ${service?.price}T`,
              value: service?.id,
            }))}
            onChange={(value) => {
              setModalServicesId(value);
            }}
          />
          <Segmented
            options={[
              { label: "standard", value: "STANDARD" },
              { label: "deep clean", value: "DEEPCLEAN" },
            ]}
            value={modalCleanMode}
            onChange={(value) => {
              console.log(value);
              setModalCleanMode(value as "STANDARD" | "DEEPCLEAN");
            }}
            size="large"
          />
        </div>
      </Modal>
    </div>
  );
};

export default LandlordPage;

import { useCallback, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation } from "react-query";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Segmented } from "antd";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

import { AuthApi } from "@/api";
import { InputCode } from "@/components/molecules/InputCode";
import { InputText } from "@/components/molecules/InputText";
import type { roles } from "@/store/User/User";
import { User } from "@/store/User/User";

type Steps = "login" | "register" | "verify";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  IIN?: string;
  confirmPassword?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  phone?: string;
  role: roles;
}

const Login = () => {
  const [step, setStep] = useState<Steps>("login");
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState<string>("");
  const { control, handleSubmit } = useForm<LoginForm>();
  const { control: registerControl, handleSubmit: handleRegisterSubmit } =
    useForm<RegisterForm>();

  const getUserInfoByToken = useCallback(() => {
    if (localStorage?.getItem("access_token")) {
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
          if (response?.data?.role === "LANDLORD") {
            router.push("/landlord");
          } else if (response?.data?.role === "CLEANER") {
            router.push("/cleaner");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  useEffect(() => {
    getUserInfoByToken();
  }, [getUserInfoByToken]);

  const { mutate: login } = useMutation(
    ["login"],
    (values: { email: string; password: string }) =>
      AuthApi.loginByEmail(values.email, values.password).then(
        (response) => response.data
      ),
    {
      onSuccess: (data) => {
        localStorage.setItem("access_token", data?.access_token);
        localStorage.setItem("refresh_token", data?.refresh_token);
        enqueueSnackbar("Success", { variant: "success" });
        getUserInfoByToken();
      },
      onError: () => {
        enqueueSnackbar("Error", { variant: "error" });
      },
    }
  );

  const { mutate: register } = useMutation(
    ["register"],
    (values: RegisterForm) =>
      AuthApi.register(
        values?.email ?? "",
        values?.password ?? "",
        values.role,
        values?.firstName ?? "",
        values?.lastName ?? "",
        values?.IIN ?? ""
      ),
    {
      onSuccess: () => {
        enqueueSnackbar("Success", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("Error", { variant: "error" });
      },
    }
  );

  const onSubmit = useCallback(
    async (values: LoginForm) => {
      try {
        await login(values);
      } catch (err: unknown) {
        console.log(err);
      }
    },
    [login]
  );

  const handleOnSubmit = useCallback(() => {
    handleSubmit(onSubmit)();
  }, [handleSubmit, onSubmit]);

  const onRegisterSubmit = useCallback(
    async (values: RegisterForm) => {
      try {
        await register(values);
        setStep("verify");
      } catch (err: unknown) {
        console.log(err);
      }
    },
    [register]
  );

  const handleOnRegisterSubmit = useCallback(() => {
    handleRegisterSubmit(onRegisterSubmit)();
  }, [handleRegisterSubmit, onRegisterSubmit]);

  const { t } = useTranslation();

  return (
    <main
      style={{
        backgroundImage: `url('/loginBackgroundCurves.png')`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "50% 200%",
      }}
      className="h-screen"
    >
      <div className="flex h-full flex-col items-center justify-center">
        <Image src="/apartXlogo.svg" alt="apartXlogo" width={330} height={73} />
        <div className="mt-8 flex h-fit w-1/2 justify-center rounded-3xl bg-white/70 py-16 shadow-sm shadow-gray">
          {step === "login" && (
            <div className="flex h-full w-1/2 flex-col items-center justify-evenly">
              <div className="text-Thin40">{t("loginPage.logIn")}</div>
              <div className="w-full">
                <Controller
                  render={({ field }) => (
                    <InputText
                      name="email"
                      wrapperClassName="mt-4"
                      value={field?.value ?? ""}
                      label="Email"
                      type="email"
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                  name="email"
                  control={control}
                  defaultValue=""
                />
              </div>
              <div className="mt-8 w-full">
                <Controller
                  control={control}
                  name="password"
                  defaultValue=""
                  render={({ field }) => (
                    <InputText
                      name="password"
                      value={field?.value ?? ""}
                      label="Password"
                      type="password"
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                />
                <div className="mt-2 flex cursor-pointer justify-end text-Thin16 italic">
                  {t("loginPage.forgotPassword")}
                </div>
              </div>
              <div className="mt-8 w-full">
                <Button
                  className="h-10 w-full rounded-xl bg-primaryBlue text-white"
                  onClick={handleOnSubmit}
                >
                  {t("loginPage.logIn")}
                </Button>
                <div className="mt-2 flex w-full justify-between">
                  <div className="cursor-pointer text-Thin16 italic">
                    {t("loginPage.dontHaveAccount")}
                  </div>
                  <div
                    className="cursor-pointer text-Bold16 italic text-primaryBlue underline"
                    onClick={() => {
                      setStep("register");
                    }}
                  >
                    {t("loginPage.signUp")}
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === "register" && (
            <div className="flex h-full w-4/5 flex-col items-center justify-evenly">
              <div
                className="mb-8 flex w-full cursor-pointer justify-start"
                onClick={() => {
                  setStep("login");
                }}
              >
                <LeftOutlined className="text-primaryBlue" />
                <div className="ml-2 text-primaryBlue">Back to login</div>
              </div>
              <div className="flex w-full">
                <Controller
                  render={({ field }) => (
                    <InputText
                      label="First name"
                      wrapperClassName="mr-2"
                      name="firstName"
                      value={field?.value ?? ""}
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                  name="firstName"
                  control={registerControl}
                />
                <Controller
                  render={({ field }) => (
                    <InputText
                      label="Last name"
                      wrapperClassName="ml-2"
                      name="lastName"
                      value={field?.value ?? ""}
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                  name="lastName"
                  control={registerControl}
                />
              </div>
              <div className="mt-4 w-full">
                <Controller
                  control={registerControl}
                  render={({ field }) => (
                    <InputText
                      label="IIN"
                      name="IIN"
                      value={field?.value ?? ""}
                      onChange={(event) => {
                        field.onChange(event);
                      }}
                    />
                  )}
                  name="IIN"
                />
              </div>
              <div className="mt-4 w-full">
                <Controller
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      label="Email"
                      name="email"
                      isError={!!fieldState?.error}
                      value={field?.value ?? ""}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        field?.onChange(event);
                      }}
                    />
                  )}
                  defaultValue=""
                  control={registerControl}
                  name="email"
                />
              </div>
              <div className="mt-4 w-full">
                <Controller
                  control={registerControl}
                  rules={{
                    required: true,
                  }}
                  name="password"
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <InputText
                      name="password"
                      value={field?.value ?? ""}
                      label="Password"
                      isError={!!fieldState?.error}
                      type="password"
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                />
              </div>
              <div className="mt-4 w-full">
                <Controller
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState }) => (
                    <InputText
                      name="confirmPassword"
                      label="Confirm password"
                      isError={!!fieldState?.error}
                      type="password"
                      value={field?.value ?? ""}
                      onChange={(event) => {
                        field?.onChange(event);
                      }}
                    />
                  )}
                  control={registerControl}
                  name="confirmPassword"
                />
              </div>
              <div className="mt-4 w-full">
                <Controller
                  control={registerControl}
                  rules={{
                    required: true,
                  }}
                  render={({ field, fieldState }) => (
                    <Segmented
                      options={[
                        { value: "CLEANER", label: "Cleaner" },
                        { value: "LANDLORD", label: "Landlord" },
                      ]}
                      value={field?.value ?? ""}
                      onChange={(value) => {
                        field?.onChange(value);
                      }}
                      size="large"
                      block
                      className={clsx("mb-4", {
                        "text-red": fieldState?.error,
                      })}
                    />
                  )}
                  name="role"
                />
              </div>
              <Button
                className="h-10 w-full rounded-xl bg-primaryBlue text-white"
                onClick={handleOnRegisterSubmit}
              >
                Sign up
              </Button>
            </div>
          )}
          {step === "verify" && (
            <div className="flex h-full w-4/5 flex-col items-center justify-evenly">
              <div className="text-Thin40">Sign up</div>
              <div className="mt-2 text-Bold20">Enter verification code</div>
              <div className="mt-2 text-Thin16">
                We&apos;ve sent a code to
                <span className="ml-2 text-Bold16 italic">{email}</span>
              </div>
              <InputCode
                onChange={(value) => {
                  if (value.length === 4) {
                    AuthApi.verifyEmail(email, value).then((res) => {
                      if (res?.data) {
                        localStorage.setItem(
                          "access_token",
                          res?.data?.access_token
                        );
                        localStorage.setItem(
                          "refresh_token",
                          res?.data?.refresh_token
                        );
                        getUserInfoByToken();
                      }
                    });
                  }
                }}
                length={4}
                containerClassName="mt-4"
              />
              <div className="mt-4 flex justify-start">
                <span className="text-Thin16 italic">Did not get code?</span>
                <span className="ml-1 cursor-pointer text-primaryBlue">
                  Click to resend
                </span>
              </div>
              <div>
                <Button
                  className="mt-2 h-10 w-full rounded-xl bg-primaryBlue text-white"
                  onClick={() => {
                    setStep("register");
                  }}
                >
                  Go back
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Login;

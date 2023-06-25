import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Work_Sans } from "@next/font/google";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
import "../styles/Home.module.css";
import { useRouter } from "next/router";

import { AuthApi } from "@/api";
import { InputText } from "@/components/molecules/InputText";
import { LanguagePopover } from "@/components/molecules/LanguagesPopover";
import { User } from "@/store/User/User";

const workSans = Work_Sans({
  subsets: ["latin"],
});

interface OfferProps {
  description?: string;
  name?: string;
  picSource?: string;
}

interface MemberProps {
  name?: string;
  picSource?: string;
  position?: string;
}

interface PortfolioElementProps {
  description: string;
  isActive?: boolean;
  name: string;
  picSource: string;
}

const PortfolioSlider: React.FC = () => {
  const { t } = useTranslation();
  const portfolio: PortfolioElementProps[] = [
    {
      description: t("indexPage.sliderMembers.windowCleanerDescription"),
      isActive: false,
      name: t("indexPage.sliderMembers.windowCleaner"),
      picSource: "../Rectangle 37.png",
    },
    {
      description: t("indexPage.sliderMembers.houseCleanerDescription"),
      isActive: false,
      name: t("indexPage.sliderMembers.windowCleaner"),
      picSource: "../Rectangle 38.png",
    },
    {
      description: t("indexPage.sliderMembers.commercialCleanerDescription"),
      isActive: true,
      name: t("indexPage.sliderMembers.commercialCleaner"),
      picSource: "../Rectangle 39.png",
    },
    {
      description: t("indexPage.sliderMembers.floorCleanerDescription"),
      isActive: false,
      name: t("indexPage.sliderMembers.floorCleaner"),
      picSource: "../Rectangle 37.png",
    },
    {
      description: t("indexPage.sliderMembers.floorCleanerDescription"),
      isActive: false,
      name: t("indexPage.sliderMembers.carpetCleaner"),
      picSource: "../Rectangle 38.png",
    },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index) => (index + 1) % portfolio.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [portfolio.length]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex">
        <PortfolioElement
          name={
            portfolio[index - 1 < 0 ? portfolio.length - 1 : index - 1].name
          }
          description={
            portfolio[index - 1 < 0 ? portfolio.length - 1 : index - 1]
              .description
          }
          picSource={
            portfolio[index - 1 < 0 ? portfolio.length - 1 : index - 1]
              .picSource
          }
          isActive={false}
        />
        <PortfolioElement
          name={portfolio[index].name}
          description={portfolio[index].description}
          picSource={portfolio[index].picSource}
          isActive={true}
        />
        <PortfolioElement
          name={portfolio[(index + 1) % portfolio.length].name}
          description={portfolio[(index + 1) % portfolio.length].description}
          picSource={portfolio[(index + 1) % portfolio.length].picSource}
          isActive={false}
        />
      </div>
      <div className="flex">
        {[0, 1, 2, 3, 4].map((ind) => (
          <div
            key={ind}
            className={clsx(`mx-1 h-2 w-2 rounded-full text-[#000000]`, {
              "bg-[#1195FF]": ind === index,
              "bg-[#DEDEDE]": ind !== index,
            })}
          ></div>
        ))}
      </div>
    </div>
  );
};

const PortfolioElement: React.FC<PortfolioElementProps> = ({
  name,
  description,
  picSource,
  isActive,
}) => (
  <div>
    <img
      className="h-[191px] w-[285px] cursor-pointer object-scale-down"
      alt="pic"
      src={picSource}
    />
    {isActive && (
      <div
        className="absolute -mt-20 ml-[0.90rem] h-16 w-[16.1rem] pl-4 text-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(217, 217, 217, 0.00) 0%, #1195FF 50%)",
        }}
      >
        <div className="flex items-end">
          <div className="flex-col">
            <p className="m-0 p-0.5">{name}</p>
            <p className="m-0 p-0.5 opacity-[86%]">{description}</p>
          </div>
          <img alt="pic" src="../arrow.svg" className="cursor-pointer" />
        </div>
      </div>
    )}
  </div>
);

const Offer: React.FC<OfferProps> = ({ name, description, picSource }) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      className={clsx(
        "flex-col items-center rounded border border-solid border-[#DEDEDE] px-5 pb-4 pt-16 text-center",
        {
          "bg-[#1195FF]": onHover,
        }
      )}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      <div className="absolute -mt-24 ml-16 flex h-16 w-16 items-center justify-center rounded-full border border-solid border-[#DEDEDE] bg-white px-5">
        <img alt="pic" src={picSource} />
      </div>
      <p
        className={clsx("-mt-4 font-semibold", {
          "text-white": onHover,
          "text-[#1195FF]": !onHover,
        })}
      >
        {name}
      </p>
      <p
        className={clsx("m-0 p-0", {
          "text-white": onHover,
          "text-black": !onHover,
        })}
      >
        {description}
      </p>
    </div>
  );
};

const Member: React.FC<MemberProps> = ({ name, position, picSource }) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div
      className={`cursor-pointer flex-col items-center rounded-t border border-solid border-[#DEDEDE] text-center`}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
    >
      {onHover && (
        <div
          className="absolute ml-16 mt-[4.5rem] flex items-center gap-1 opacity-100"
          style={{ zIndex: "5000" }}
        >
          <img alt="pic" className="cursor-pointer" src="../facebook.svg" />
          <p className="mt-4 text-white">|</p>
          <img alt="pic" className="cursor-pointer" src="../twitter.svg" />
          <p className="mt-4 text-white">|</p>
          <img alt="pic" className="cursor-pointer" src="../linkedin-in.svg" />
        </div>
      )}
      <div
        className={clsx({
          "bg-[#1195FF] absolute h-48 w-48 rounded-t bg-[1195FF] opacity-50":
            onHover,
        })}
      ></div>
      <img alt="pic" className="h-48 w-48 rounded-t" src={picSource} />
      <p
        className={clsx("mt-2 font-semibold", {
          "text-[#1195FF]": onHover,
          "text-[#333333]": !onHover,
        })}
      >
        {name}
      </p>
      <p className="text-[#666666]">{position}</p>
    </div>
  );
};

const RoomSelector: React.FC = () => {
  const [rooms, setRooms] = useState(1);
  const { t } = useTranslation();

  return (
    <div className="flex h-8 items-center justify-center gap-2 rounded bg-white text-white">
      <button
        className="h-8 w-8 cursor-pointer rounded-xl rounded-l border-none bg-[#1195FF] outline-none hover:bg-[#1195FF]/80"
        onClick={() => setRooms((rooms) => rooms - 1)}
        disabled={rooms === 1}
      >
        -
      </button>
      <p className="m-0 flex items-center p-0 text-[#000000]">
        {t(`indexPage.rooms.${rooms}`)}
      </p>
      <button
        className="h-8 w-8 cursor-pointer rounded-xl rounded-r border-none bg-[#1195FF] outline-none hover:bg-[#1195FF]/80"
        onClick={() => setRooms((rooms) => rooms + 1)}
        disabled={rooms === 5}
      >
        +
      </button>
    </div>
  );
};

const BathroomSelector: React.FC = () => {
  const [rooms, setRooms] = useState(1);
  const { t } = useTranslation();

  return (
    <div className="flex h-8 items-center justify-between gap-4 rounded bg-white text-white">
      <button
        className="h-8 w-8 cursor-pointer rounded-xl rounded-l border-none bg-[#1195FF] outline-none hover:bg-[#1195FF]/80"
        onClick={() => setRooms((rooms) => rooms - 1)}
        disabled={rooms === 1}
      >
        -
      </button>
      <p className="m-0 flex items-center p-0 text-[#000000]">
        {t(`indexPage.bathRooms.${rooms}`)}
      </p>
      <button
        className="h-8 w-8 cursor-pointer rounded-xl rounded-r border-none bg-[#1195FF] outline-none hover:bg-[#1195FF]/80"
        onClick={() => setRooms((rooms) => rooms + 1)}
        disabled={rooms === 5}
      >
        +
      </button>
    </div>
  );
};

const Home: NextPage = observer(() => {
  const router = useRouter();
  useEffect(() => {
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const [phone, setPhone] = useState<string>("");
  const { t } = useTranslation();
  return (
    <div
      className={workSans.className}
      style={{
        backgroundImage: `url('/backgroundCurves.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "Work Sans, sans-serif",
      }}
    >
      <header className="justify-center p-10 font-medium text-[#292929]">
        <nav>
          <ul className="flex list-none items-center justify-center gap-12 px-32">
            <li className="mr-auto">
              <img
                src="../apartXlogo.svg"
                alt="apart-x-logo"
                className="shrink-0"
              />
            </li>
            <li>{t("indexPage.home")}</li>
            <li>{t("indexPage.aboutUs")}</li>
            <li>{t("indexPage.services")}</li>
            <li>{t("indexPage.blog")}</li>
            <li className="">{t("indexPage.contacts")}</li>
            {User.auth ? (
              <li
                className="cursor-pointer"
                onClick={() => {
                  router.push(
                    User.role === "LANDLORD"
                      ? "/landlord"
                      : User.role === "CLEANER"
                      ? "cleaner"
                      : "/"
                  );
                }}
              >
                Welcome, {User.name}
              </li>
            ) : (
              <li>
                <button
                  onClick={() => {
                    router.push("/login");
                  }}
                  className="flex w-[9rem] cursor-pointer items-center justify-center rounded-3xl border-none bg-[#1195FF] p-3 text-white outline-none hover:bg-[#1195FF]/80"
                >
                  {t("loginPage.logIn")}
                </button>
              </li>
            )}
            <LanguagePopover />
          </ul>
        </nav>
      </header>
      <main className="flex h-screen flex-col justify-start">
        <div className="flex px-32">
          <div
            className="mt-16 flex w-1/2 flex-col py-10 text-left"
            id="description"
          >
            <p>{t("indexPage.information1.title1")}</p>
            <h1 className="flex flex-col">
              <span className="font-bold text-[#1195FF]">
                {t("indexPage.information1.title2")}
              </span>
              <span className="font-bold text-[#555555]">
                {t("indexPage.information1.title3")}
              </span>
            </h1>
            <p>{t("indexPage.information1.welcomeText")}</p>
            <button className="flex w-[9rem] cursor-pointer items-center justify-center rounded-3xl border-none bg-[#1195FF] p-3 text-white outline-none  hover:bg-[#1195FF]/80">
              {t("indexPage.information1.getAQuote")}
            </button>
            <p className="pt-20 text-[#1195FF]">
              {t("indexPage.information1.trustedPartners")}
            </p>
            <p className="font-bold text-[#555555]">
              {t("indexPage.information1.trustedBrands")}
            </p>
          </div>
          <img
            alt="cleaner"
            src="../cleaner.png"
            id="pic"
            style={{ width: "351.167px", height: "434.194px" }}
          />
        </div>

        <div className="mx-32 mb-5 flex items-center justify-center gap-4 whitespace-nowrap bg-[#DEDEDE]/60 px-16 py-4">
          <RoomSelector />
          <BathroomSelector />
          <InputText
            isPhone
            name="phone"
            label="phone"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
          <button className="flex w-full cursor-pointer items-center justify-center rounded border-none bg-[#1195FF] p-3 text-white outline-none hover:bg-[#1195FF]/80">
            {t("indexPage.calculatePrice")}
          </button>
        </div>
        {/* LINE WITH LOGOS */}
        <div className="flex w-full items-center justify-center gap-24 bg-[#1195FF] py-6">
          <img alt="logo-1" src="../group-3.svg" />
          <img alt="logo-2" src="../vector.svg" />
          <img alt="logo-3" src="../logo-3.svg" />
          <img alt="logo-4" src="../logo-4.svg" />
          <img alt="logo-5" src="../group-2.svg" />
          <img alt="logo-6" src="../group-4.svg" />
        </div>

        {/* INFORMATION BLOCK 2 */}
        <div className="flex items-center px-32">
          <div
            className="mt-16 flex w-2/3 flex-col py-10 text-left"
            id="description"
          >
            <p className="pt-20 text-[#1195FF]">{t("indexPage.aboutUs")}</p>
            <p>{t("indexPage.information1.title1")}</p>
            <h1 className="flex flex-col">
              <span className="font-bold text-[#555555]">
                {t("indexPage.information2.title1")}
              </span>
              <span className="font-bold text-[#555555]">
                {t("indexPage.information1.title3")}
              </span>
            </h1>
            <p className="w-2/3">{t("indexPage.information2.text1")}</p>
            <div className="mt-4 flex items-center gap-1">
              {t("indexPage.information2.title2")}
              <img alt="award" src="../award.svg" />
            </div>
            <p className="w-2/3">{t("indexPage.information2.text2")}</p>
            <button className="flex w-[8rem] cursor-pointer items-center justify-center rounded-3xl border-none bg-[#1195FF] p-3 text-white outline-none  hover:bg-[#1195FF]/80">
              {t("indexPage.information2.ourServices")}
            </button>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4">
              <img alt="pic" className="" src="../rectangle-8.png" id="pic" />
              <img alt="pic" className="" src="../rectangle-10.png" id="pic" />
            </div>
            <div className="flex flex-col gap-4">
              <img
                alt="pic"
                className="rounded-tr"
                src="../rectangle-9.png"
                id="pic"
              />
              <img alt="pic" className="" src="../rectangle-11.png" id="pic" />
            </div>
          </div>
          <div></div>
        </div>

        {/* OUR TEAM OFFERS */}
        <div className="flex flex-col  items-center justify-center gap-4 px-32">
          <p className="text-[#1195FF]">
            {t("indexPage.ourTeamOffers.ourTeam")}
          </p>
          <h2 className="mb-12 font-bold text-[#555555]">
            {t("indexPage.ourTeamOffers.offering")}
          </h2>
          <div className="flex gap-4">
            <Offer
              name={t("indexPage.ourTeamOffers.services.houseCleaning")}
              description={t(
                "indexPage.ourTeamOffers.descriptions.houseCleaning"
              )}
              picSource="../group-38.svg"
            />
            <Offer
              name={t("indexPage.ourTeamOffers.services.officeCleaning")}
              description={t(
                "indexPage.ourTeamOffers.descriptions.officeCleaning"
              )}
              picSource="../group-35.svg"
            />
            <Offer
              name={t("indexPage.ourTeamOffers.services.floorCleaning")}
              description={t(
                "indexPage.ourTeamOffers.descriptions.floorCleaning"
              )}
              picSource="../group-37.svg"
            />
            <Offer
              name={t("indexPage.ourTeamOffers.services.windowCleaning")}
              description={t(
                "indexPage.ourTeamOffers.descriptions.windowCleaning"
              )}
              picSource="../group-36.svg"
            />
          </div>
        </div>

        {/* OUR TEAM MEMBERS */}
        <div className="flex flex-col  items-center justify-center gap-4 px-32">
          <p className="mt-16 text-[#1195FF]">
            {t("indexPage.ourTeamOffers.ourTeam")}
          </p>
          <h2 className="mb-2 font-bold text-[#555555]">
            {t("indexPage.ourTeamMembers.experts")}
          </h2>
          <div className="flex gap-4">
            <Member
              name="Devon Lane"
              position={t("indexPage.sliderMembers.windowCleaner")}
              picSource="../member-3.png"
            />
            <Member
              name="Cody Phisher"
              position={t("indexPage.sliderMembers.houseCleaner")}
              picSource="../member-4.png"
            />
            <Member
              name="Ralph Edwards"
              position={t("indexPage.sliderMembers.commercialCleaner")}
              picSource="../member-2.png"
            />
            <Member
              name="Bessie Cooper"
              position={t("indexPage.sliderMembers.floorCleaner")}
              picSource="../member-1.png"
            />
          </div>
        </div>

        {/* OUR PORTFOLIO */}
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="mt-16 text-[#1195FF]">
            {t("indexPage.portfolio.title")}
          </p>
          <h2 className="mb-2 font-bold text-[#555555]">
            {t("indexPage.portfolio.showcase")}
          </h2>
          <PortfolioSlider />
        </div>
        <div className="mt-10 flex flex-col gap-4 px-[12.5rem] py-5">
          <div className="flex w-full items-center justify-center gap-6 rounded bg-[#1195FF] py-8">
            <div className="flex gap-4">
              <img alt="pic" src="../Group.svg" />
              <div className="flex-col items-center text-white">
                <h1 className="m-0 p-0 text-[24.5px] font-bold">567+</h1>
                <p className="m-0 whitespace-nowrap p-0 text-[12px]">
                  {t("indexPage.portfolio.happyCustomers")}
                </p>
              </div>
            </div>
            <div className="h-10 w-px bg-white"></div>
            <div className="flex gap-4">
              <img alt="pic" src="../Group (1).svg" />
              <div className="flex-col items-center text-white">
                <h1 className="m-0 p-0 text-[24.5px] font-bold">48</h1>
                <p className="m-0 whitespace-nowrap p-0 text-[12px]">
                  {t("indexPage.portfolio.teamMembers")}
                </p>
              </div>
            </div>
            <div className="h-10 w-px bg-white"></div>
            <div className="flex gap-4">
              <img alt="pic" src="../Group (2).svg" />
              <div className="flex-col items-center text-white">
                <h1 className="m-0 p-0 text-[24.5px] font-bold">26</h1>
                <p className="m-0 whitespace-nowrap p-0 text-[12px]">
                  {t("indexPage.portfolio.awardsWinning")}
                </p>
              </div>
            </div>
            <div className="h-10 w-px bg-white"></div>
            <div className="flex gap-4">
              <img alt="pic" src="../Group (3).svg" />
              <div className="flex-col items-center text-white">
                <h1 className="m-0 p-0 text-[24.5px] font-bold">759+</h1>
                <p className="m-0 whitespace-nowrap p-0 text-[12px]">
                  {t("indexPage.portfolio.projectsComplete")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
});

export default Home;

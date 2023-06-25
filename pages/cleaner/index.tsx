// import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Work_Sans } from "@next/font/google";

/* import clsx from "clsx";
import { observer } from "mobx-react-lite";
import type { NextPage } from "next";
// import "./styles/Home.module.css";
import { useRouter } from "next/router";

import { AuthApi } from "@/api";
import { InputText } from "@/components/molecules/InputText";
import { LanguagePopover } from "@/components/molecules/LanguagesPopover";
import { User } from "@/store/User/User";
*/

const workSans = Work_Sans({
  subsets: ["latin"],
});

const Cleaner = () => {
  console.log("cleaner page");
  const { t } = useTranslation();
  return (
    <div className={workSans.className}>
      <header className="justify-center p-10 font-medium text-[#292929]">
        <nav>
          <ul className="flex list-none items-center justify-center gap-12 px-32">
            <li>{t("indexPage.home")}</li>
            <li>{t("cleanerPage.orders")}</li>
            <li className="mr-auto">{t("indexPage.contacts")}</li>
            <button className="flex w-[9rem] cursor-pointer items-center justify-center rounded-3xl border-none bg-[#1195FF] p-3 text-white outline-none hover:bg-[#1195FF]/80">
              Log out
            </button>
          </ul>
        </nav>
      </header>
      <main className="flex h-screen flex-col justify-start">
        <div className="flex flex-col px-32">
          <img
            className="mr-auto h-[4rem] w-[4rem] shrink-0"
            src="../apartXlogo.svg"
            alt="apart-x-logo"
          />
          <p>
            Look for the orders in <u className="cursor-pointer">Almaty</u>{" "}
            today
          </p>
        </div>
        <div className="flex flex-col px-32">
          <div
            className="h-[279px] w-[849px] rounded-lg"
            style={{
              backgroundImage: "url(../order-1.png)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex justify-between p-4 text-white">
              <div className="flex flex-col text-[24px] font-bold">
                <p className="m-1 p-1">Ерканат</p>
                <img src="../stars.svg" alt="star" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cleaner;

// import { useEffect, useState } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Work_Sans } from "@next/font/google";

import { CleanerApi } from "@/api";

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
interface Order {
  dateTime: Date;
  desiredPrice: number;
  distance: number;
  id: number;
  landLordId: number;
  landLordName: string;
}

interface LandLord {
  id: number;
  name: string;
}

const Cleaner = () => {
  console.log("cleaner page");
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [landLords, setLandLords] = useState<LandLord[]>([
    /*
    { id: 1, name: "Ерканат" },
    { id: 2, name: "Салтанат" },
    { id: 3, name: "Нагима" },
    */
  ]);
  useEffect(() => {
    CleanerApi.getOrders().then((res) => {
      setOrders(res.data);
    });
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      orders.map((order) => {
        CleanerApi.getLandLord(order.landLordId).then((res) => {
          setLandLords((prev) => [
            ...prev,
            {
              id: order.landLordId,
              name: `${res.data.firstname} ${res.data.lastname}`,
            },
          ]);
        });
      });
    }
  }, [orders]);

  return (
    <div className={workSans.className}>
      <header className="justify-center p-10 font-medium text-[#292929]">
        <nav>
          <ul className="flex list-none items-center justify-center gap-12 px-32">
            <li className="cursor-pointer">{t("indexPage.home")}</li>
            <li className="cursor-pointer">{t("cleanerPage.orders")}</li>
            <li className="mr-auto cursor-pointer">
              {t("indexPage.contacts")}
            </li>
            <button className="flex w-[9rem] cursor-pointer items-center justify-center rounded-3xl border-none bg-[#1195FF] p-3 text-white outline-none hover:bg-[#1195FF]/80">
              {t("cleanerPage.logOut")}
            </button>
          </ul>
        </nav>
      </header>
      <main className="flex h-screen flex-col items-center">
        <img
          className="ml-56 mr-auto h-[73px] w-[331px] shrink-0"
          src="../apartXlogo.svg"
          alt="apart-x-logo"
        />
        <p className="ml-56 self-start text-left text-[22px]">
          Look for the orders in <u className="cursor-pointer">Almaty</u> today
        </p>
        <div className="flex flex-col items-start gap-16 px-32 ">
          {orders.map((order: Order) => (
            <div
              key={order.id}
              className="h-[320px] w-[849px] flex-col rounded-lg py-4"
              style={{
                backgroundImage: "url(../order-1.png)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center justify-between px-12 pt-2 text-white">
                <div className="flex flex-col text-[24px] font-bold">
                  <p className="m-1 p-1">
                    {landLords.find((ll) => ll.id === order.landLordId)?.name}
                  </p>
                  <img src="../stars.svg" alt="star" />
                </div>
                <p className="m-0 p-0 text-[20px] font-bold">
                  {order.id + 5} км
                </p>
              </div>
              <div className="mt-24 flex items-center justify-between self-end px-12 pb-2 text-white">
                <div className="flex flex-col text-[20px] ">
                  <p className="m-1 p-0 font-bold">
                    {new Date(order.dateTime).toLocaleString("ru-RU", {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="m-1">
                    {new Date(order.dateTime).toLocaleString("ru-RU", {
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </p>
                </div>
                <button
                  className="h-[59px] w-[208px] cursor-pointer rounded-3xl border-none bg-[#FF8B00] outline-none hover:bg-[#E27600]"
                  onClick={() => {
                    CleanerApi.respondToOrder(order.id, order.desiredPrice);
                  }}
                >
                  Откликнуться
                  <img className="ml-2" src="../arrow.svg" alt="arrow" />
                </button>
                <p>
                  <img src="../kzt.svg" alt="kzt" />
                  {order.desiredPrice}
                </p>
              </div>
            </div>
          ))}
          {/*
          <div
            className="h-[279px] w-[849px] flex-col rounded-lg py-4"
            style={{
              backgroundImage: "url(../order-1.png)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between px-12 pt-2 text-white">
              <div className="flex flex-col text-[24px] font-bold">
                <p className="m-1 p-1">Ерканат</p>
                <img src="../stars.svg" alt="star" />
              </div>
              <p className="m-0 p-0 text-[20px] font-bold">3 км</p>
            </div>
            <div className="mt-24 flex items-center justify-between self-end px-12 pb-2 text-white">
              <div className="flex flex-col text-[20px] ">
                <p className="m-1 p-0 font-bold">26 июня</p>
                <p className="m-1">18:00</p>
              </div>
              <button className="h-[59px] w-[208px] cursor-pointer rounded-3xl border-none bg-[#FF8B00] outline-none hover:bg-[#E27600]">
                {t("cleanerPage.moreDetails")}
                <img className="ml-2" src="../arrow.svg" alt="arrow" />
              </button>
              <p>
                <img src="../kzt.svg" alt="kzt" />
                12000
              </p>
            </div>
          </div>
          <div
            className="h-[279px] w-[849px] flex-col rounded-lg py-4"
            style={{
              backgroundImage: "url(../order-1.png)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between px-12 pt-2 text-white">
              <div className="flex flex-col text-[24px] font-bold">
                <p className="m-1 p-1">Батима</p>
                <img src="../stars.svg" alt="star" />
              </div>
              <p className="m-0 p-0 text-[20px] font-bold">5 км</p>
            </div>
            <div className="mt-24 flex items-center justify-between self-end px-12 pb-2 text-white">
              <div className="flex flex-col text-[20px] ">
                <p className="m-1 p-0 font-bold">26 июня</p>
                <p className="m-1">12:15</p>
              </div>
              <button className="h-[59px] w-[208px] cursor-pointer rounded-3xl border-none bg-[#FF8B00] outline-none hover:bg-[#E27600]">
                {t("cleanerPage.moreDetails")}
                <img className="ml-2" src="../arrow.svg" alt="arrow" />
              </button>
              <p>
                <img src="../kzt.svg" alt="kzt" />
                10000
              </p>
            </div>
          </div>
          <div
            className="h-[279px] w-[849px] flex-col rounded-lg py-4"
            style={{
              backgroundImage: "url(../order-1.png)",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex items-center justify-between px-12 pt-2 text-white">
              <div className="flex flex-col text-[24px] font-bold">
                <p className="m-1 p-1">Салтанат</p>
                <img src="../stars.svg" alt="star" />
              </div>
              <p className="m-0 p-0 text-[20px] font-bold">8 км</p>
            </div>
            <div className="mt-24 flex items-center justify-between self-end px-12 text-white">
              <div className="flex flex-col text-[20px] ">
                <p className="m-1 p-0 font-bold">27 июня</p>
                <p className="m-1">10:00</p>
              </div>
              <button className="h-[59px] w-[208px] cursor-pointer rounded-3xl border-none bg-[#FF8B00] outline-none hover:bg-[#E27600]">
                {t("cleanerPage.moreDetails")}
                <img className="ml-2" src="../arrow.svg" alt="arrow" />
              </button>
              <p>
                <img src="../kzt.svg" alt="kzt" />
                15000
              </p>
            </div>
          </div>
          */}
        </div>
      </main>
    </div>
  );
};

export default Cleaner;

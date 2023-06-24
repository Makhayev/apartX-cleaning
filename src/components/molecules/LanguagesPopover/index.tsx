import { useTranslation } from "react-i18next";

import { DownOutlined, RightOutlined } from "@ant-design/icons";
import type { PopoverProps } from "antd";
import { Button, Popover, Image } from "antd";
import clsx from "clsx";

export const LanguagePopover = ({
  isLogin = true,
  ...rest
}: { isLogin?: boolean } & PopoverProps) => {
  const { t, i18n } = useTranslation();
  const LanguagesList = (
    <div className="flex w-28 flex-col">
      {["ru", "kz", "en"].map((language) => (
        <Button
          key={language}
          icon={
            <Image
              alt="flag"
              src={`${language}Flag.png`}
              preview={false}
              width="32px"
              height="16px"
            />
          }
          className="flex h-9 items-center justify-start border-0 px-0"
          onClick={() => {
            i18n.changeLanguage(language);
          }}
        >
          <span className="ml-2">
            {language === "ru"
              ? "Русский"
              : language === "kz"
              ? "Қазақша"
              : "English"}
          </span>
        </Button>
      ))}
    </div>
  );
  return (
    <Popover
      className={clsx("cursor-pointer", {
        "absolute top-12 right-10": isLogin,
      })}
      content={LanguagesList}
      trigger="click"
      {...rest}
    >
      <div className="flex w-28 items-center justify-between">
        <Image
          alt="flag"
          src={`${i18n.resolvedLanguage}Flag.png`}
          preview={false}
          width="24px"
          height="16px"
        />
        {isLogin ? (
          <>
            {t("languagePopover.currentLanguage")}
            <DownOutlined />
          </>
        ) : (
          <RightOutlined />
        )}
      </div>
    </Popover>
  );
};

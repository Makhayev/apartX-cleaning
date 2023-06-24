import { forwardRef, useEffect, useRef, useState } from "react";
import { PatternFormat } from "react-number-format";

import { Input } from "antd";
import clsx from "clsx";

import type { InputTextProps } from "./props";

export const InputText = forwardRef<HTMLDivElement, InputTextProps>(
  (
    {
      label,
      inputClassName,
      wrapperClassName,
      isSuccess = false,
      value,
      onChange,
      isPhone = false,
      name,
      type,
      disabled = false,
      isError = false,
    },
    ref
  ) => {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState<boolean>(!!value);
    useEffect(() => {
      setIsFocused(!!value);
    }, [value]);
    return (
      <div ref={ref} className={clsx("w-full", wrapperClassName)}>
        <div
          className={clsx(
            "flex h-14 w-full items-center justify-between rounded-xl border-2 border-solid border-primaryBlue",
            {
              "bg-lightGray": disabled,
              "!border-primaryBlue": isSuccess,
              "!border-red": isError,
            }
          )}
        >
          <div className="flex w-full flex-col px-4">
            {isPhone ? (
              <div>
                <PatternFormat
                  className="w-full border-0 bg-primaryBlue text-Regular16 text-dark focus:border-0 focus-visible:border-0 focus-visible:outline-none active:border-0"
                  format="+7 (###) ### ## ##"
                  onChange={(event) => onChange(event)}
                  mask="_"
                  name={name}
                  value={value ?? null}
                  disabled={disabled}
                  placeholder="Ваш номер телефона"
                />
              </div>
            ) : (
              <>
                {label && (
                  <>
                    <div
                      className={clsx(
                        "absolute z-30 cursor-text text-primaryBlue transition-all",
                        {
                          "mt-3.5 text-Regular16": !isFocused,
                          "mt-0 text-Regular12": isFocused,
                        }
                      )}
                      onClick={() => {
                        setIsFocused(true);
                        inputRef?.current?.focus();
                      }}
                    >
                      {label}
                    </div>
                    <Input
                      ref={inputRef}
                      disabled={disabled ?? false}
                      onChange={(event) => onChange(event)}
                      onFocus={() => setIsFocused(true)}
                      value={value}
                      name={name}
                      onBlur={(event) => {
                        if (event.target.value === "") {
                          setIsFocused(false);
                        }
                      }}
                      type={type}
                      className={clsx(
                        inputClassName,
                        "mt-4 w-full border-0 pl-0 hover:border-0 focus:border-0 focus:shadow-none active:border-0 disabled:bg-lightGray"
                      )}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

InputText.displayName = "InputText";

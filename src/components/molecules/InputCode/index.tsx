import type { FC, Ref } from "react";
import { forwardRef } from "react";
import type { AuthCodeRef } from "react-auth-code-input";
import AuthCode from "react-auth-code-input";

import clsx from "clsx";

import type { InputCodePropsType } from "./props";

export const InputCode: FC<InputCodePropsType> = forwardRef(
  (
    {
      onChange,
      length = 3,
      containerClassName,
      inputClassName,
    }: InputCodePropsType,
    ref: Ref<AuthCodeRef> | undefined
  ) => (
    <AuthCode
      ref={ref}
      onChange={onChange}
      length={length ?? 3}
      allowedCharacters="numeric"
      containerClassName={clsx("flex", containerClassName)}
      inputClassName={clsx(
        "mx-2 h-16 w-16 rounded-xl border-2 p-2 text-center text-Bold32 text-dark focus-visible:border-2 focus-visible:border-solid focus-visible:shadow-none focus-visible:outline-none",
        inputClassName
      )}
    />
  )
);

InputCode.displayName = "InputCode";

import type { ChangeEvent, HTMLInputTypeAttribute } from "react";

export interface InputTextProps {
  bottomText?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  inputClassName?: string;
  isError?: boolean;
  isPhone?: boolean;
  isSuccess?: boolean;
  label: string;
  name: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  showAsterisk?: boolean;
  type?: HTMLInputTypeAttribute;
  value?: string;
  wrapperClassName?: string;
}

import { useCallback, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";

import { Button, Segmented } from "antd";
import clsx from "clsx";
import Image from "next/image";

import { AuthApi } from "@/api";
import { InputCode } from "@/components/molecules/InputCode";
import { InputText } from "@/components/molecules/InputText";
import type { roles } from "@/store/User/User";

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
  const [email, setEmail] = useState<string>("");
  const { control, handleSubmit } = useForm<LoginForm>();
  const { control: registerControl, handleSubmit: handleRegisterSubmit } =
    useForm<RegisterForm>();

  const { mutate: login } = useMutation(
    ["login"],
    (values: { email: string; password: string }) =>
      AuthApi.loginByEmail(values.email, values.password),
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const { mutate: register } = useMutation(
    ["register"],
    (values: RegisterForm) => {
      console.log(values);
      return AuthApi.register(
        values?.email ?? "",
        values?.password ?? "",
        values.role
      );
    },
    {
      onSuccess: () => {
        console.log("success");
      },
      onError: () => {
        console.log("error");
      },
    }
  );

  const onSubmit = useCallback(
    async (values: LoginForm) => {
      try {
        const data = await login(values);
        console.log(data);
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
        const data = await register(values);
        console.log(data);
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
              <div className="text-Thin40">Log in</div>
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
                  I forgot my password
                </div>
              </div>
              <div className="mt-8 w-full">
                <Button
                  className="h-10 w-full rounded-xl bg-primaryBlue text-white"
                  onClick={handleOnSubmit}
                >
                  Log in
                </Button>
                <div className="mt-2 flex w-full justify-between">
                  <div className="cursor-pointer text-Thin16 italic">
                    Don&apos;t have an account?
                  </div>
                  <div
                    className="cursor-pointer text-Bold16 italic text-primaryBlue underline"
                    onClick={() => {
                      setStep("register");
                    }}
                  >
                    Sign up
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === "register" && (
            <div className="flex h-full w-4/5 flex-col items-center justify-evenly">
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
              <div className="text-Bold20">Enter verification code</div>
              <div className="text-Thin16">
                We&apos;ve sent a code to
                <span className="text-Bold16 italic">{email}</span>
              </div>
              <InputCode
                onChange={(value) => {
                  if (value.length === 4) {
                    AuthApi.verifyEmail(email, value).then((res) => {
                      if (res?.data?.status === "SUCCESS") {
                        localStorage.setItem(
                          "access_token",
                          res?.data?.access_token
                        );
                        localStorage.setItem(
                          "refresh_token",
                          res?.data?.refresh_token
                        );
                        setStep("login");
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
                  className="h-10 w-full rounded-xl bg-primaryBlue text-white"
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

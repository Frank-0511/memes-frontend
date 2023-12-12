"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../schema";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const responseNextAuth = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    // if (responseNextAuth?.error) {
    //   console.log(
    //     "🚀 ~ responseNextAuth.error",
    //     responseNextAuth.error.split(",")
    //   );
    // }

    router.push("/");
  };

  return (
    <form
      className="w-full max-w-lg flex flex-col gap-y-4 p-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        control={control}
        defaultValue=""
        name="email"
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
        }) => (
          <Input
            autoComplete="email"
            errorMessage={error?.message}
            isInvalid={invalid}
            label="Email"
            onChange={onChange}
            type="email"
            value={value}
            variant="bordered"
          />
        )}
      />
      <Controller
        control={control}
        defaultValue=""
        name="password"
        render={({
          field: { onChange, value },
          fieldState: { invalid, error },
        }) => (
          <Input
            autoComplete="current-password"
            errorMessage={error?.message}
            isInvalid={invalid}
            label="Password"
            onChange={onChange}
            type="password"
            value={value}
            variant="bordered"
          />
        )}
      />
      <div className="flex gap-x-8">
        <Button
          className="flex-1"
          color="primary"
          type="submit"
          isLoading={isSubmitting}
        >
          Login
        </Button>
      </div>
    </form>
  );
};

"use client";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import Spinner from "./spinner/Spinner";
import Link from "next/link";
import { loginDataType } from "@/lib/validation/auth.schema";
import { useState } from "react";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginDataType>();

  const singInUser = async () => {};

  const [isRouting, setIsRouting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(singInUser)}>
          {errors.root && (
            <FieldError className="text-xs">{errors.root.message}</FieldError>
          )}
          <FieldGroup className="gap-4">
            <Field className="gap-1">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Controller
                control={control}
                defaultValue=""
                name="email"
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    disabled={isSubmitting || isRouting}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <FieldError id="email-error">
                  ${errors.email.message}
                </FieldError>
              )}
            </Field>
            <Field className="gap-1">
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Controller
                control={control}
                defaultValue=""
                name="password"
                render={({ field }) => (
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    disabled={isSubmitting || isRouting}
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <FieldError id="email-error">
                  ${errors.password.message}
                </FieldError>
              )}
            </Field>
            <Field className="flex flex-row items-center justify-start w-full p-0">
              <Input
                type="checkbox"
                name="show-password"
                id="show-password"
                onChange={(event) =>
                  event.target.checked
                    ? setShowPassword(true)
                    : setShowPassword(false)
                }
                className=""
                style={{ width: "fit-content" }}
              />
              <FieldLabel htmlFor="show-password" className="grow w-full">
                Show Password
              </FieldLabel>
            </Field>
            <Field className="gap-1">
              <Button
                type="submit"
                disabled={isSubmitting || isRouting}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Spinner text="Processing" /> : "Login"}
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={isSubmitting || isRouting}
                className="cursor-pointer disabled:cursor-not-allowed"
              >
                Login with Google
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account?{" "}
                <Link
                  href="register"
                  onClick={(e) =>
                    isSubmitting || isRouting
                      ? e.preventDefault()
                      : setIsRouting(true)
                  }
                  className={`${
                    (isSubmitting || isRouting) &&
                    "cursor-not-allowed hover:text-zinc-600 text-zinc-600"
                  } `}
                >
                  Sign up
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

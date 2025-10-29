"use client";
import { register } from "@/app/authentication/actions";
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
import { registerDataType } from "@/lib/validation/auth.schema";
import { Controller, useForm } from "react-hook-form";
import Spinner from "./spinner/Spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<registerDataType>();

  const pathRouter = useRouter();

  const createUser = async (data: registerDataType) => {
    console.log(data);
    const response = await register(data);
    if (!response.success) {
      if (response.type == "validation") {
        if (typeof response.errors != "string") {
          Object.entries(response.errors).forEach(([field, messages]) => {
            if (messages && messages[0]) {
              setError(field as keyof registerDataType, {
                type: "validate",
                message: messages[0],
              });
            }
          });
        } else {
          setError("root", {
            type: "server",
            message: response.errors,
          });
        }
      } else {
        setError("root", {
          type: "server",
          message: response.errors as string,
        });
      }
    } else if (response.success && response.redirect) {
      pathRouter.replace(response.redirect);
    }
  };

  const [isRouting, setIsRouting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card {...props}>
      <CardHeader className="select-none">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(createUser)}>
          {errors.root && (
            <FieldError className="text-xs">{errors.root.message}</FieldError>
          )}
          <FieldGroup className="gap-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Controller
                name="displayName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    disabled={isSubmitting || isRouting}
                    {...field}
                  />
                )}
              />
              {errors.displayName && (
                <FieldError className="text-xs" id="name">
                  {errors.displayName.message}
                </FieldError>
              )}
            </Field>
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
                <FieldError className="text-xs" id="name">
                  {errors.email.message}
                </FieldError>
              )}
              <FieldDescription className="select-none">
                We will not share your email with anyone else.
              </FieldDescription>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="password">Password</FieldLabel>
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
                <FieldError className="text-xs" id="name">
                  {errors.password.message}
                </FieldError>
              )}
              <FieldDescription className="select-none">
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Controller
                control={control}
                defaultValue=""
                name="confirmPassword"
                render={({ field }) => (
                  <Input
                    id="confirm-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    disabled={isSubmitting || isRouting}
                    {...field}
                  />
                )}
              />
              {errors.confirmPassword && (
                <FieldError className="text-xs" id="name">
                  {errors.confirmPassword.message}
                </FieldError>
              )}
              <FieldDescription className="select-none">
                Please confirm your password.
              </FieldDescription>
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
                style={{width : 'fit-content'}}
              />
              <FieldLabel htmlFor="show-password" className="grow w-full">Show Password</FieldLabel>
            </Field>
            <FieldGroup>
              <Field className="gap-1">
                <Button
                  type="submit"
                  disabled={isSubmitting || isRouting}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Spinner text="Creating" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  disabled={isSubmitting || isRouting}
                  className="cursor-pointer disabled:cursor-not-allowed"
                >
                  Sign up with Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Already have an account?{" "}
                  <Link
                    href="login"
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
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

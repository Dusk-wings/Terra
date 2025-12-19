"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import Spinner from "./spinner/Spinner";
import { supabaseBrowser } from "@/utils/supabase/client";

type AUTH_TYPE = "google" | "github" | null;

function AuthenticationFrom({ ...props }: React.ComponentProps<typeof Card>) {
  const [isNavigating, setIsNavigating] = useState(false);
  const [authType, setAuthType] = useState<AUTH_TYPE>(null);

  const [isBlocked, setIsBlocked] = useState(true);
  useEffect(
    () =>
      localStorage.getItem("authentication-in-progress")
        ? setIsBlocked(true)
        : setIsBlocked(false),
    []
  );

  const handelOAuth = async (authType: AUTH_TYPE) => {
    if (authType == null || isNavigating) return;
    if (localStorage.getItem("authentication-in-progress")) return;
    try {
      setIsNavigating(true);
      setAuthType(authType);
      localStorage.setItem("authentication-in-progress", "true");
      // console.log(window.location.origin);

      const { error } = await supabaseBrowser.auth.signInWithOAuth({
        provider: authType,
        options: {
          // Use your app URL or omit to use Supabase configured callback
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        console.error("Sign-in error:", error);
        // optionally show UI error
        localStorage.removeItem("authentication-in-progress");
        setIsNavigating(false);
      }
      // if redirect occurs, user leaves the page; otherwise you'll remain and should reset state when needed
    } catch (err) {
      console.error("Unexpected error during signin:", err);
      localStorage.removeItem("authentication-in-progress");
      setIsNavigating(false);
    }
  };

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome to Terra.</CardTitle>
        <CardDescription>
          Continue with your Github or Google account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup className="gap-4">
          <Field className="gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => handelOAuth("github")}
              disabled={isNavigating || isBlocked}
              className={`flex items-center justify-center gap-2 w-full disabled:bg-zinc-800 cursor-pointer disabled:cursor-not-allowed`}
            >
              {isNavigating && authType == "github" && (
                <Spinner className="place-self-start" />
              )}
              <span className=" flex gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                <span>Login with GitHub</span>
              </span>
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handelOAuth("google")}
              disabled={isNavigating || isBlocked}
              className={`flex items-center justify-center gap-2 w-full disabled:bg-zinc-800 cursor-pointer disabled:cursor-not-allowed`}
            >
              {isNavigating && authType == "google" && (
                <Spinner className="w-min" />
              )}
              <span className=" flex gap-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-google"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
                </svg>
                <span>Login with Google</span>
              </span>
            </Button>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

export default AuthenticationFrom;

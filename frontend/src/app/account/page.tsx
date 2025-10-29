"use client";
import Spinner from "@/components/spinner/Spinner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabaseBrowser } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Account() {
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const handelLogOut = async () => {
    setIsProcessing(true);
    try {
      await supabaseBrowser.auth.signOut();

      const response = await fetch(
        new URL("/api/auth/logout", process.env.NEXT_PUBLIC_SERVER_PATH),
        { method: "POST" }
      );
      if (!response.ok) throw new Error("Server logout failed");

      router.replace("/authentication");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>
          Your account user details are stated below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div id="danger-button" className="flex flex-col gap-2">
          <Button
            type="button"
            className="hover:bg-red-900 bg-red-800/70 cursor-pointer text-white font-bold"
            onClick={handelLogOut}
            disabled={isProcessing}
          >
            {isProcessing ? <Spinner text={"Logging Out"} /> : "Logout"}
          </Button>
          <Button variant={"destructive"} type="button" disabled={isProcessing}>
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default Account;

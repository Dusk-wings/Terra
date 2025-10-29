"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/utils/supabase/client";

function AuthValidator() {
  const router = useRouter();
  React.useEffect(() => {
    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          localStorage.removeItem("authentication-in-progress");
          router.push("/"); 
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [router]);
  return <></>;
}

export default AuthValidator;

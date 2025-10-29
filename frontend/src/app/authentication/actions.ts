"use server";
import {
  loginDataType,
  loginSchema,
  registerDataType,
  registerSchema,
} from "@/lib/validation/auth.schema";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createToken } from "./verification/action";

export async function login(formData: loginDataType) {
  const supabaseClient = await createClient();

  const rawData = {
    email: formData.email,
    password: formData.password,
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    console.warn(
      "Parsing data failed for login : ",
      parsed.error.flatten().fieldErrors
    );
    redirect("/error");
  }

  const { error } = await supabaseClient.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });

  if (error) {
    console.log(error);
    redirect("/error");
  } else {
    revalidatePath("/", "layout");
    redirect("/");
  }
}

export async function register(formData: registerDataType) {
  const supabaseClient = await createClient();

  const parsed = registerSchema.safeParse(formData);
  if (!parsed.success) {
    console.warn(
      "Parsing data failed for register : ",
      parsed.error.flatten().fieldErrors
    );
    return {
      success: false,
      type: "validation",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const { data, error } = await supabaseClient.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      // emailRedirectTo : ''
    },
  });

  if (error || !data.user) {
    console.log(error);
    return {
      success: false,
      type: "creation",
      errors: "Unexpected error, please try again latter",
    };
  }

  const { error: profileError } = await supabaseClient
    .from("profiles")
    .update({
      display_name: formData.displayName,
    })
    .eq("id", data.user?.id);

  if (profileError) {
    console.error("Profile insert failed:", profileError);
    await supabaseClient.auth.admin.deleteUser(data.user.id);
    return {
      success: false,
      type: "creation",
      errors:
        profileError.message || "Unexpected error, please try again latter",
    };
  }
  revalidatePath("/", "layout");
  const token = await createToken(data.user?.id);
  return {
    success: true,
    redirect: `/authentication/verification/${token}`,
  };
}

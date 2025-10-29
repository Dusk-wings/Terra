"use server";
import { createClient } from "@/utils/supabase/server";

const TOKEN_EXPIRATION_MS = 10 * 60 * 1000;

export const createToken = async (userId: string) => {
  const supabaseClient = await createClient();
  console.log(userId)
  const token = `${crypto.randomUUID()}-${Date.now()}`;

  // Use upsert to insert or update existing token
  const { error } = await supabaseClient
    .from("email-token")
    .upsert({ user_id: userId, token }, { onConflict: "user_id" });

  if (error) {
    console.error("Error creating token:", error);
    throw new Error("Could not create token");
  }

  return token;
};

export const checkToken = async (userId: string, token: string) => {
  const supabaseClient = await createClient();

  const { data, error, count } = await supabaseClient
    .from("email-token")
    .select("token, creation_time", { count: "exact" })
    .eq("user_id", userId);

  if (error) {
    console.error("Error checking token:", error);
    return false;
  }

  if (!count || !data?.[0]) return false;

  const { token: dbToken, creation_time } = data[0];
  const now = Date.now();
  const createdAt = new Date(creation_time).getTime();

  // Check expiration
  if (now > createdAt + TOKEN_EXPIRATION_MS) {
    // Optionally delete expired token
    await supabaseClient.from("email-token").delete().eq("user_id", userId);
    return false;
  }

  if (dbToken !== token) return false;

  await supabaseClient.from("email-token").delete().eq("user_id", userId);

  return true;
};

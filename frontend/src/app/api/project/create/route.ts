import { NextResponse } from "next/server";
import { createProjectSchema } from "@/lib/validation/project.schema";
import { createClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const SupabaseServerClient = await createClient();

    const requestData = await request.json();
    const validation = createProjectSchema.safeParse(requestData);

    if (!validation.success) {
      console.error("Validation error creating project:", validation.error);
      return NextResponse.json(
        { success: false, error: "Validation error" },
        { status: 400 }
      );
    }

    try {
      const {
        data: { user },
        error,
      } = await SupabaseServerClient.auth.getUser();
      if (error || !user) {
        throw error?.message || "Unauthenticated user";
      }

      console.log("Creating project for user:", user.id);

      try {
        const { data, error } = await SupabaseServerClient.from("projects")
          .insert([
            {
              project_name: requestData.project_name,
              project_description: requestData.project_description,
              is_public: requestData.is_public,
              theme_name: requestData.theme,
              slug: requestData.slug,
            },
          ])
          .select("project_id");
        if (error) {
          throw error;
        }

        return NextResponse.json(
          { success: true, projectId: data![0].project_id },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error creating project:", error);
        if (error instanceof PostgrestError && error.code === "23505") {
          if (error.message.includes("projects_slug_key")) {
            return NextResponse.json(
              { success: false, error: "Slug already in use" },
              { status: 409 }
            );
          } else {
            return NextResponse.json(
              { success: false, error: "Project name already in use" },
              { status: 409 }
            );
          }
        }
        return NextResponse.json(
          {
            success: false,
            error:
              error instanceof Error
                ? error.message
                : error instanceof PostgrestError
                ? error.message
                : "Error creating project",
          },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("Authentication error:", error);
      return NextResponse.json(
        { success: false, error: "Authentication failed" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}

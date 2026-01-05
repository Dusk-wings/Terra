import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { SearchSchemaType } from "@/lib/validation/search.schema";
import { SupabaseProjectData } from "@/store/projectSlice/projectSlice";
import Spinner from "./spinner/Spinner";
import ProjectCard from "./project-card";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/utils/supabase/client";
import { HttpError } from "@/lib/utils/error";
import { useDispatch } from "react-redux";
import { hidePopUp } from "@/store/popUpContentSlice/popUpContentSlice";

interface Props {
  placeholder: string;
  searchContainerText: string;
}

type isError = {
  error: boolean;
  message: string;
};

function SearchForm({ placeholder, searchContainerText }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchSchemaType>({
    defaultValues: {
      search_string: "",
    },
  });

  const [searchedData, setSearchedData] = React.useState<
    null | SupabaseProjectData[]
  >(null);
  const [isError, setIsError] = React.useState<null | isError>(null);

  const navigator = useRouter();
  const dispatcher = useDispatch();

  const searchProject = async (data: SearchSchemaType) => {
    try {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (error || !user) {
        throw new HttpError(409, "Authentication Failed, Please reload !!");
      }

      const { data: search, error: searchError } = await supabaseBrowser
        .from("project_members")
        .select(
          "project_id, role, projects!inner (project_name, created_at, is_public, slug, project_status)"
        )
        .ilike("projects.project_name", `%${data.search_string}%`)
        .eq("user_id", user.id)
        .returns<SupabaseProjectData[]>();

      if (searchError) {
        console.log(searchError);
        throw new HttpError(500, "Internal Server Error");
      }
      console.log(search);
      setSearchedData(search);
    } catch (error) {
      console.error(error);
      const message =
        error instanceof HttpError
          ? error.message
          : "Server Error, Please try again latter";
      setIsError({ error: true, message });
    }
  };

  return (
    <div>
      <div id="search-container" className="flex items-center">
        <Button
          variant="secondary"
          className="rounded-r-none"
          type="submit"
          form="serach-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner /> : <Search />}
        </Button>
        <form
          className="w-full"
          id="serach-form"
          onSubmit={handleSubmit(searchProject)}
          autoComplete="off"
        >
          <Controller
            control={control}
            name="search_string"
            render={({ field }) => (
              <Input
                placeholder={placeholder}
                className="rounded-l-none"
                id="search-input"
                autoComplete="off"
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          {errors && errors.search_string && (
            <p className="text-xs text-red-800">
              {errors.search_string.message}
            </p>
          )}
        </form>
      </div>
      <div
        id="item-container"
        className="min-h-16 max-h-96 overflow-scroll overflow-x-hidden bg-popover mt-4 rounded-md flex select-none  items-center flex-col scroll-container-vertical p-2 "
      >
        {isSubmitting ? (
          <Spinner />
        ) : isError ? (
          <p className="text-xs text-red-800">{isError.message}</p>
        ) : searchedData ? (
          <div className="flex flex-col gap-2 w-full">
            {searchedData.map((project) => (
              <ProjectCard
                key={project.project_id}
                project={project}
                action={() => {
                  navigator.push(`/dashboard/project/${project.project_id}`);
                  dispatcher(hidePopUp());
                }}
                isSmall={true}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-card-foreground/60">
            {searchContainerText}
          </p>
        )}
      </div>
    </div>
  );
}

export default SearchForm;

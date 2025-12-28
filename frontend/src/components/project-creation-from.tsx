"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  CreateProjectDataType,
  createProjectSchema,
  THEMES,
} from "@/lib/validation/project.schema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "./ui/field";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
// import { supabaseBrowser } from "@/utils/supabase/client";
import {
  hidePopUp,
  showPopUp,
} from "@/store/popUpContentSlice/popUpContentSlice";
import { setProjectData } from "@/store/projectSlice/projectSlice";
import { HttpError } from "@/lib/utils/error";

interface Props {
  setIsPreformingAction: React.Dispatch<React.SetStateAction<boolean>>;
}

function ProjectCreationForm({ setIsPreformingAction }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateProjectDataType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      project_name: "",
      project_description: "",
      is_public: true,
      theme: "Standard",
      slug: "",
    },
  });

  const dispatch = useDispatch<AppDispatch>();

  const handelProjectCreation = async (data: CreateProjectDataType) => {
    setIsPreformingAction(true);
    try {
      const response = await fetch("/api/project/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJson = await response.json();
      const { success, projectId, error: functionError } = responseJson;

      if (!success) {
        throw (
          new HttpError(response.status, functionError) ||
          new HttpError(500, "Project creation failed")
        );
      } else {
        if (projectId) {
          dispatch(
            setProjectData({
              project_id: projectId,
              project_name: data.project_name,
              role: "owner",
            })
          );
        }
        dispatch(hidePopUp());
        dispatch(
          showPopUp({
            title: "Project Created",
            message: "Your project has been created successfully.",
            type: "REDIRECT_PROJECT",
            isActionable: true,
            redirect_path: `/dashboard/${projectId}`,
          })
        );
      }
    } catch (error) {
      console.error("Error creating project:", error);
      if (error instanceof HttpError && error.status === 409) {
        setError("root", { type: "manual", message: error.message });
      } else {
        dispatch(hidePopUp());
        dispatch(
          showPopUp({
            title: "Error",
            message:
              "There was an error creating your project. Please try again.",
            type: "ERROR",
            isActionable: false,
          })
        );
      }
    } finally {
      setIsPreformingAction(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handelProjectCreation)} id="form">
      {errors.root && (
        <FieldError className="text-xs">{errors.root.message}</FieldError>
      )}
      <FieldGroup className="gap-4 mt-1">
        <Field className="gap-1">
          <FieldLabel htmlFor="project_name" className="font-semibold">
            Project Name
          </FieldLabel>
          <Controller
            name="project_name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                id="project_name"
                type="text"
                placeholder="My Awesome Project"
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          {errors.project_name && (
            <FieldError className="text-xs" id="project_name">
              {errors.project_name.message}
            </FieldError>
          )}
          <FieldDescription className="text-xs select-none">
            Give a unique name to your project.
          </FieldDescription>
        </Field>
        <Field className="gap-1">
          <FieldLabel htmlFor="project_description" className="font-semibold">
            Project Description
          </FieldLabel>
          <Controller
            control={control}
            defaultValue=""
            name="project_description"
            render={({ field }) => (
              <Input
                id="project_description"
                type="text"
                placeholder="Describe your project..."
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          {errors.project_description && (
            <FieldError className="text-xs" id="project_description">
              {errors.project_description.message}
            </FieldError>
          )}
          <FieldDescription className="text-xs select-none">
            Provide a brief description of your project (max 200 characters)
          </FieldDescription>
        </Field>
        <Field className="gap-1">
          <FieldLabel htmlFor="slug" className="font-semibold">
            Slug
          </FieldLabel>
          <Controller
            control={control}
            defaultValue=""
            name="slug"
            render={({ field }) => (
              <Input
                id="slug"
                type="text"
                placeholder="my-awesome-project"
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
          {errors.slug && (
            <FieldError className="text-xs" id="slug">
              {errors.slug.message}
            </FieldError>
          )}
          <FieldDescription className="text-xs select-none">
            A URL-friendly identifier for your project, should be unique.
          </FieldDescription>
        </Field>
        <Field className="gap-1">
          <FieldLabel htmlFor="theme" className="font-semibold">
            Theme
          </FieldLabel>
          <Controller
            control={control}
            defaultValue="Standard"
            name="theme"
            render={({ field }) => (
              <Select
                disabled={isSubmitting}
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Standard" />
                </SelectTrigger>
                <SelectContent
                  id="theme"
                  position="popper"
                  // className="bg-red-900 z-[9999] relative"
                  sideOffset={4}
                >
                  <SelectGroup>
                    <SelectLabel>Theme</SelectLabel>
                    {THEMES.map((theme) => (
                      <SelectItem key={theme} value={theme}>
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.project_description && (
            <FieldError className="text-xs" id="project_description">
              {errors.project_description.message}
            </FieldError>
          )}
          <FieldDescription className="text-xs select-none">
            Select a theme for your project, can be changed later.
          </FieldDescription>
        </Field>
        <Field className="gap-1">
          <div className="flex gap-4">
            <FieldLabel htmlFor="is_public" className="font-semibold">
              Make Project Active
            </FieldLabel>
            <Controller
              control={control}
              defaultValue={true}
              name="is_public"
              render={({ field }) => (
                <Switch
                  id="is_public"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              )}
            />
          </div>
          {errors.is_public && (
            <FieldError className="text-xs" id="is_public">
              {errors.is_public.message}
            </FieldError>
          )}
          <FieldDescription className="text-xs select-none">
            Would you like to make the project publicly accessible, via the slug
            that you have provided?
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}

export default ProjectCreationForm;

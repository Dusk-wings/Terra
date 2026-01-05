import { supabaseBrowser } from "@/utils/supabase/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectData {
  project_id: string;
  project_name: string;
  role: string;
}

interface InitailState {
  projects: ProjectData[];
  error: boolean;
  errorText: string | null;
  loading: boolean;
  projectsLoading: boolean;
  projectsError: boolean;
  completeProject: SupabaseProjectData[];
  projectErrorText: string | null;
}

const ProjectInitialState: InitailState = {
  projects: [],
  error: false,
  errorText: null,
  loading: true,
  projectsLoading: true,
  projectsError: false,
  projectErrorText: null,
  completeProject: [],
};

interface SupabaseRecentProject {
  project_id: string;
  role: string;
  projects: {
    project_name: string;
  };
}

export interface SupabaseProjectData {
  project_id: string;
  role: string;
  projects: {
    project_name: string;
    project_description: string;
    created_at: string;
    is_public: boolean;
    slug: string;
    project_status: string;
  };
}

export const fetchProjectData = createAsyncThunk<
  SupabaseRecentProject[],
  void,
  { rejectValue: string }
>("project/fetchProjectData", async (_: void, { rejectWithValue }) => {
  try {
    const {
      data: { session },
      error,
    } = await supabaseBrowser.auth.getSession();
    if (error) {
      return rejectWithValue("Failed to get user session");
    }
    if (!session?.user) {
      return rejectWithValue("No user session found");
    }

    const { data: projects, error: projectsError } = await supabaseBrowser
      .from("project_members")
      .select("project_id, role, projects (project_name)")
      .eq("user_id", session.user.id)
      // .order("updated_at", { ascending: false })
      .limit(4)
      .returns<SupabaseRecentProject[]>();

    if (projectsError) {
      return rejectWithValue("Failed to fetch project data");
    }
    console.log(projects);
    return projects as SupabaseRecentProject[];
  } catch (error) {
    console.error("Error fetching project data:", error);
    return rejectWithValue("Failed to fetch project data");
  }
});

export const fetchCompleteProjectDetails = createAsyncThunk<
  SupabaseProjectData[],
  void,
  { rejectValue: string }
>(
  "project/fetchCompleteProjectDetails",
  async (_: void, { rejectWithValue }) => {
    try {
      const {
        data: { user },
        error,
      } = await supabaseBrowser.auth.getUser();

      if (error) {
        return rejectWithValue("Failed to get user session");
      }
      if (!user) {
        return rejectWithValue("No user session found");
      }

      const { data: projectDetails, error: projectDetailsError } =
        await supabaseBrowser
          .from("project_members")
          .select(
            "project_id, role, projects (project_name, project_description, created_at, is_public, slug, project_status)"
          )
          .eq("user_id", user.id)
          .returns<SupabaseProjectData[]>();

      // console.log(projectDetails);

      if (projectDetailsError) {
        return rejectWithValue("Failed to fetch project details");
      }

      // Return the complete project details
      return projectDetails;
    } catch (error) {
      console.error("Error fetching complete project details:", error);
      return rejectWithValue("Failed to fetch complete project details");
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: ProjectInitialState,
  reducers: {
    setProjectData: (state, action: PayloadAction<ProjectData>) => {
      state.projects.push(action.payload);
    },
    clearProjectData: (state) => {
      state.projects = [];
    },
    removeProjectAtId: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.project_id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorText = action.payload || "Unknown error";
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.errorText = null;
        state.projects = [];
        action.payload.forEach((project) => {
          state.projects.push({
            project_id: project.project_id,
            project_name: project.projects.project_name,
            role: project.role,
          });
        });
      })
      .addCase(fetchProjectData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompleteProjectDetails.pending, (state) => {
        state.projectsLoading = true;
      })
      .addCase(fetchCompleteProjectDetails.rejected, (state, action) => {
        state.projectsLoading = false;
        state.projectsError = true;
        state.projectErrorText = action.payload || "Unknown Error";
      })
      .addCase(fetchCompleteProjectDetails.fulfilled, (state, action) => {
        state.projectsLoading = false;
        state.projectsError = false;
        state.projectErrorText = null;
        state.completeProject = [...action.payload];
      });
  },
});

export const { setProjectData, clearProjectData } = projectSlice.actions;

export default projectSlice.reducer;

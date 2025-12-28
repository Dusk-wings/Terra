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
}

const ProjectInitialState: InitailState = {
  projects: [],
  error: false,
  errorText: null,
  loading: false,
};

interface SupabaseProjectData {
  project_id: string;
  role: string;
  projects: {
    project_name: string;
  };
}

export const fetchProjectData = createAsyncThunk<
  SupabaseProjectData[],
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
      .returns<SupabaseProjectData[]>();

    if (projectsError) {
      return rejectWithValue("Failed to fetch project data");
    }
    console.log(projects);
    return projects as SupabaseProjectData[];
  } catch (error) {
    console.error("Error fetching project data:", error);
    return rejectWithValue("Failed to fetch project data");
  }
});

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
      });
  },
});

export const { setProjectData, clearProjectData } = projectSlice.actions;

export default projectSlice.reducer;

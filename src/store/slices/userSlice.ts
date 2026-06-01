import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersApi,
  getProfileApi,
  followUserApi,
  unfollowUserApi,
  updateProfileImageApi,
  editProfileApi,
  updatePasswordApi,
  getUserConnectionsApi,
} from "../../api/auth.api";

interface UserState {
  users: any[];
  searchTerm: string;
  connections: any[];
  viewedUser: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  connections: [],
  searchTerm: "",
  viewedUser: null,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data: any = await getAllUsersApi();
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data: any = await getProfileApi(
        `${import.meta.env.VITE_BASE_URL}/api/profile/user/${userId}`,
      );
      return data.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Server unreachable. Check your connection.";
      return rejectWithValue(errorMessage);
    }
  },
);

export const followUser = createAsyncThunk(
  "users/follow",
  async (
    {
      targetUserId,
      currentUserId,
    }: { targetUserId: string; currentUserId: string },
    { rejectWithValue },
  ) => {
    try {
      await followUserApi(targetUserId);
      return { targetUserId, currentUserId };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const unfollowUser = createAsyncThunk(
  "users/unfollow",
  async (
    {
      targetUserId,
      currentUserId,
    }: { targetUserId: string; currentUserId: string },
    { rejectWithValue },
  ) => {
    try {
      await unfollowUserApi(targetUserId);
      return { targetUserId, currentUserId };
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateProfileImage = createAsyncThunk(
  "users/updateImage",
  async (file: File, { rejectWithValue }) => {
    try {
      const response: any = await updateProfileImageApi(file);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const editProfile = createAsyncThunk(
  "users/editProfile",
  async (
    userData: { username: string; email: string },
    { rejectWithValue },
  ) => {
    try {
      const data: any = await editProfileApi(userData);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "users/updatePassword",
  async (
    data: { currentPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await updatePasswordApi(data);
      return response;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchConnections = createAsyncThunk(
  "user/fetchConnections",
  async (
    { userId, type }: { userId: string; type: "followers" | "following" },
    { rejectWithValue },
  ) => {
    try {
      const response: any = await getUserConnectionsApi(userId, type);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    clearConnections: (state) => {
      state.connections = [];
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.viewedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Network Error: Backend is unreachable";
        state.error = action.payload;
      })

      .addCase(followUser.fulfilled, (state, action) => {
        const { targetUserId, currentUserId } = action.payload;

        if (
          state.viewedUser &&
          (state.viewedUser._id === targetUserId ||
            state.viewedUser.userId === targetUserId)
        ) {
          if (!state.viewedUser.followers.includes(currentUserId)) {
            state.viewedUser.followers.push(currentUserId);
          }
        }

        const userInList = state.users.find(
          (u) => u._id === targetUserId || u.userId === targetUserId,
        );
        if (userInList && !userInList.followers.includes(currentUserId)) {
          userInList.followers.push(currentUserId);
        }

        const userInConnections = state.connections.find(
          (u) => u._id === targetUserId || u.userId === targetUserId,
        );
        if (
          userInConnections &&
          !userInConnections.followers.includes(currentUserId)
        ) {
          userInConnections.followers.push(currentUserId);
        }
      })

      .addCase(unfollowUser.fulfilled, (state, action) => {
        const { targetUserId, currentUserId } = action.payload;

        if (
          state.viewedUser &&
          (state.viewedUser._id === targetUserId ||
            state.viewedUser.userId === targetUserId)
        ) {
          state.viewedUser.followers = state.viewedUser.followers.filter(
            (id: string) => id !== currentUserId,
          );
        }

        const userInList = state.users.find(
          (u) => u._id === targetUserId || u.userId === targetUserId,
        );
        if (userInList) {
          userInList.followers = userInList.followers.filter(
            (id: string) => id !== currentUserId,
          );
        }

        const userInConnections = state.connections.find(
          (u) => u._id === targetUserId || u.userId === targetUserId,
        );
        if (userInConnections) {
          userInConnections.followers = userInConnections.followers.filter(
            (id: string) => id !== currentUserId,
          );
        }
      })
      
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        if (state.viewedUser && action.payload.profileUrl) {
          state.viewedUser.profileUrl = action.payload.profileUrl;
        }
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.viewedUser) {
          state.viewedUser.username = action.payload.username;
          state.viewedUser.email = action.payload.email;
        }
        const index = state.users.findIndex(
          (u) => u._id === action.payload._id,
        );
        if (index !== -1) {
          state.users[index] = { ...state.users[index], ...action.payload };
        }
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchConnections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.loading = false;
        state.connections = action.payload;
      })
      .addCase(fetchConnections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSearchTerm, clearUserError, clearConnections } =
  userSlice.actions;
export default userSlice.reducer;

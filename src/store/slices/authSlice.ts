import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, registerApi, getProfileApi } from "../../api/auth.api";
import { setToken, getToken, removeToken } from "../../utils/localStorage";
import type { User } from "../../types/user.types";
import { fetchUnreadChatCount } from "./chatSlice";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

function validateInputs(
  email: string,
  password: string,
  checkFor: boolean,
  username?: string,
): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if ((checkFor && !username) || (username && username.length < 2))
    return "Name must be at least 2 characters long";

  if (!email || !emailRegex.test(email))
    return "Please enter a valid email address";

  if (!password || !passwordRegex.test(password))
    return "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";

  return "";
}

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const error = validateInputs(trimmedEmail, trimmedPassword, false);
      if (error) {
        throw new Error(error);
      }
      const data = await loginApi(email, password);
      setToken(data.token);
      fetchUnreadChatCount();
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Login failed");
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      username,
      email,
      password,
    }: { username: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const trimmedName = username.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const error = validateInputs(
        trimmedEmail,
        trimmedPassword,
        true,
        trimmedName,
      );
      if (error) {
        throw new Error(error);
      }

      const data = await registerApi(username, email, password);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message || "Registration failed");
    }
  },
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      const data: any = await getProfileApi(
        `${import.meta.env.VITE_BASE_URL}/api/profile`,
      );
      return data.data;
    } catch (err: any) {
      removeToken();
      return rejectWithValue(err.message || "Failed to fetch profile");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        state.isAuthenticated = false;
      });

    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
        state.error = null; 
        state.isAuthenticated = false;
        state.user = null;
      });
  },
});

export const { clearError, logout } = authSlice.actions;
export default authSlice.reducer;

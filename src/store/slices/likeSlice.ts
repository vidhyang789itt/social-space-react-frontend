import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostLikesApi,
  likePostApi,
  unlikePostApi,
} from "../../api/like.api";

interface LikeState {
  likeCounts: Record<string, number>;
  userLikes: string[];
  loading: boolean;
  error: string | null;
}

const initialState: LikeState = {
  likeCounts: {},
  userLikes: [],
  loading: false,
  error: null,
};

export const likePost = createAsyncThunk(
  "likes/likePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      await likePostApi(postId);
      return { postId };
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const unlikePost = createAsyncThunk(
  "likes/unlikePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      await unlikePostApi(postId);
      return { postId };
    } catch (err: any) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchLikeCount = createAsyncThunk(
  "likes/fetchCount",
  async (
    { postId }: { postId: string; currentUserId?: string },
    { rejectWithValue },
  ) => {
    try {
      const response: any = await getAllPostLikesApi(postId);
      return {
        postId,
        count: response.body.length,
        body: response.body,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Backend Is not Connected",
      );
    }
  },
);

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likePost.pending, (state, action) => {
        const postId = action.meta.arg;
        if (!state.userLikes.includes(postId)) {
          state.userLikes.push(postId);
          state.likeCounts[postId] = (state.likeCounts[postId] || 0) + 1;
        }
      })
      .addCase(unlikePost.pending, (state, action) => {
        const postId = action.meta.arg;
        state.userLikes = state.userLikes.filter((id) => id !== postId);
        state.likeCounts[postId] = Math.max(
          0,
          (state.likeCounts[postId] || 1) - 1,
        );
      })
      .addCase(likePost.rejected, (state, action) => {
        const postId = action.meta.arg;
        state.userLikes = state.userLikes.filter((id) => id !== postId);
        state.likeCounts[postId] = Math.max(
          0,
          (state.likeCounts[postId] || 1) - 1,
        );
      })
      .addCase(unlikePost.rejected, (state, action) => {
        const postId = action.meta.arg;
        if (!state.userLikes.includes(postId)) {
          state.userLikes.push(postId);
          state.likeCounts[postId] = (state.likeCounts[postId] || 0) + 1;
        }
      })
      .addCase(fetchLikeCount.fulfilled, (state, action) => {
        const { postId, count, body } = action.payload;
        state.likeCounts[postId] = count;

        const hasUserLiked = body.some((item: any) => {
          const userId = item.user?._id || item.user;
          return userId === action.meta.arg.currentUserId;
        });

        if (hasUserLiked && !state.userLikes.includes(postId)) {
          state.userLikes.push(postId);
        } else if (!hasUserLiked && state.userLikes.includes(postId)) {
          state.userLikes = state.userLikes.filter((id) => id !== postId);
        }
      });
  },
});

export default likeSlice.reducer;

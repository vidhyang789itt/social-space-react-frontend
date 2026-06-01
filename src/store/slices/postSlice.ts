import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFeedApi,
  createPostApi,
  getUserPostsApi,
  deletePostApi,
  updatePostApi,
  updatePostMediaApi,
  getSinglePostApi,
} from "../../api/post.api";
import type { Post, CreatePostPayload, UpdatePostMediaPayload } from "../../types/post.types";

interface PostsState {
  feed: Post[];
  singlePost: Post | null;
  loading: boolean;
  error: string | null;
  userPosts: Post[];
  pagination: {
    totalPost: number;
    totalPages: number;
    currentPage: number;
  };
}

const initialState: PostsState = {
  feed: [],
  singlePost: null,
  loading: false,
  error: null,
  userPosts: [],
  pagination: {
    totalPost: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

export const fetchFeed = createAsyncThunk(
  "posts/fetchFeed",
  async (page: number, { rejectWithValue }) => {
    try {
      const data: any = await getFeedApi(page, 10);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload: CreatePostPayload, { rejectWithValue }) => {
    try {
      const data: any = await createPostApi(
        {title: payload.title,
        content: payload.content,
        media: payload.media,}
      );
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const updatePostMedia = createAsyncThunk(
  "posts/updatePostMedia",
  async (payload: UpdatePostMediaPayload, { rejectWithValue }) => {
    try {
      const data: any = await updatePostMediaApi({
        postId: payload.postId,
        media: payload.media || [],
        removeMediaIds: payload.removeMediaIds || [],
      });
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const data: any = await getSinglePostApi(postId);
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const updatePost = createAsyncThunk(
  "posts/editPost",
  async (
    {
      postId,
      title,
      content,
    }: { postId: string; title: string; content: string },
    { rejectWithValue },
  ) => {
    try {
      const data: any = await updatePostApi(postId, { title, content });
      return data.data;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);


export const fetchUserPosts = createAsyncThunk(
  "posts/fetchUserPosts",
  async (userId: string, { rejectWithValue }) => {
    try {
      const data: any = await getUserPostsApi(userId);
      return data.body;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: string, { rejectWithValue }) => {
    try {
      await deletePostApi(postId);
      return postId;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload.body;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchFeed.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.feed.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.loading = false;
        state.singlePost = action.payload;
      })
      .addCase(fetchSinglePost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;

        state.feed = state.feed.map((post) =>
          post.postId === updated.postId ? updated : post,
        );

        if (state.singlePost?.postId === updated.postId) {
          state.singlePost = updated;
        }
      })
      .addCase(updatePost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updatePostMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostMedia.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;

        state.feed = state.feed.map((post) =>
          post.postId === updated.postId ? updated : post,
        );

        if (state.singlePost?.postId === updated.postId) {
          state.singlePost = updated;
        }
      })
      .addCase(updatePostMedia.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = state.feed.filter(
          (post) => post.postId !== action.payload,
        );
      })
      .addCase(deletePost.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPostError } = postSlice.actions;
export default postSlice.reducer;
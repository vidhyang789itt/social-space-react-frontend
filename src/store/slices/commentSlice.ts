import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  commentPostApi,
  deleteCommentApi,
  editCommentApi,
  getAllPostCommentsApi,
} from "../../api/comment.api";
import type { Comment } from "../../types/comment.type";

interface CommentState {
  commentsByPostId: {
    [postId: string]: Comment[];
  };
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  commentsByPostId: {},
  loading: false,
  error: null,
};

export const fetchPostComments = createAsyncThunk(
  "comments/fetchByPost",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await getAllPostCommentsApi(postId);
      return {
        postId,
        comments: response.comments || [],
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Backend Is not Connected",
      );
    }
  },
);

export const addComment = createAsyncThunk(
  "comments/add",
  async (
    { postId, content }: { postId: string; content: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await commentPostApi(postId, content);

      return {
        postId,
        newComment: response.newComment || response,
      };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Backend Is not Connected",
      );
    }
  },
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (
    { postId, commentId }: { postId: string; commentId: string },
    { rejectWithValue },
  ) => {
    try {
      await deleteCommentApi(commentId);

      return { postId, commentId };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Backend Is not Connected",
      );
    }
  },
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({
    postId,
    commentId,
    content,
  }: {
    postId: string;
    commentId: string;
    content: string;
  }) => {
    const response = await editCommentApi(commentId, content);

    return {
      postId,
      commentId,
      updatedComment: response.newComment,
    };
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments: (state) => {
      state.commentsByPostId = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, comments } = action.payload;
        state.commentsByPostId[postId] = comments;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Backend Is not Connected";
      })

      .addCase(addComment.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        const { postId, newComment } = action.payload;

        if (!state.commentsByPostId[postId]) {
          state.commentsByPostId[postId] = [];
        }

        state.commentsByPostId[postId].unshift(newComment);
      })

      .addCase(deleteComment.fulfilled, (state, action) => {
        const { postId, commentId } = action.payload;

        if (state.commentsByPostId[postId]) {
          state.commentsByPostId[postId] = state.commentsByPostId[
            postId
          ].filter((comment) => comment._id !== commentId);
        }
      })

      .addCase(updateComment.fulfilled, (state, action) => {
        const { postId, commentId, updatedComment } = action.payload;

        const comments = state.commentsByPostId[postId];
        if (!comments) return;

        const index = comments.findIndex((c) => c._id === commentId);
        if (index !== -1) {
          comments[index] = updatedComment;
        }
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;

import { fetchComments } from "../utils/network";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentsState } from "./interface/commentsState";
import { Comment } from "../interfaces/comment";

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    addReply: (
      state,
      action: PayloadAction<{ parentId: string; reply: Comment }>
    ) => {
      const { parentId, reply } = action.payload;
      const parentComment = state.comments.find(
        (comment) => comment.id === parentId
      );
      if (parentComment) {
        parentComment.replies = [...(parentComment.replies || []), reply];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchComments.fulfilled,
        (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload;
        }
      )
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export const { addComment, addReply } = commentsSlice.actions;
export default commentsSlice.reducer;

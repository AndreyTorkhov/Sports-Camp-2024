import { Comment } from "../interfaces/comment";
import { KeyboardEvent } from "react";

export const handleCommentSubmit = (
  event: KeyboardEvent<HTMLInputElement>,
  commentText: string,
  onAddComment: (newComment: Comment) => void,
  setCommentText: (text: string) => void
) => {
  if (event.key === "Enter") {
    if (commentText.trim()) {
      onAddComment({
        id: Date.now().toString(),
        text: commentText.trim(),
        author: { nick: "user" },
        published: { bunin: new Date().toISOString() },
        rating: { plus: 0, minus: 0 },
        replies: [],
      });
      setCommentText("");
    }
  }
};

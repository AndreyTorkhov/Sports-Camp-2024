// commentService.ts
import { Comment } from "../interfaces/comment";

export const saveCommentsToLocalStorage = (comments: Comment[]) => {
  localStorage.setItem("comments", JSON.stringify(comments));
};

export const getCommentsFromLocalStorage = (): Comment[] => {
  const storedComments = localStorage.getItem("comments");
  return storedComments ? JSON.parse(storedComments) : [];
};

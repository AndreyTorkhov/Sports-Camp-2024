import { Comment } from "../interfaces/comment";

export const createNewComment = (
  text: string,
  parentComment: Comment
): Comment => {
  return {
    id: new Date().getTime().toString(),
    text,
    parentComment,
    author: { nick: "Current User" },
    rating: { plus: 0, minus: 0 },
    published: { bunin: new Date().toLocaleDateString() },
  };
};

import { Comment } from "../../../interfaces/comment";

export interface CommentItemProps {
  comment: Comment;
  commentRef: React.RefCallback<HTMLDivElement>;
  scrollToComment: (commentId: string) => void;
  onReply: (parentComment: Comment, text: string) => void;
}

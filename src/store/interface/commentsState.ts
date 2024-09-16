import { Comment } from "../../interfaces/comment";

export interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

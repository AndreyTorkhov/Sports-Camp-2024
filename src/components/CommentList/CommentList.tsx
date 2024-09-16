import React, { useRef } from "react";
import { Comment } from "../../interfaces/comment";
import CommentItem from "../CommentItem/CommentItem";
import { createNewComment } from "../../services/createNewComment";
import { scrollToComment } from "../../services/scrollToComment";
import styles from "./CommentList.module.scss";

interface CommentListProps {
  comments: Comment[];
  onAddComment: (newComment: Comment) => void;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onAddComment,
}) => {
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleReply = (parentComment: Comment, text: string) => {
    const newComment = createNewComment(text, parentComment);
    onAddComment(newComment);
  };

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentRef={(el) => (commentRefs.current[comment.id] = el)}
          scrollToComment={(commentId) =>
            scrollToComment(commentRefs, commentId)
          }
          onReply={handleReply}
        />
      ))}
    </div>
  );
};

export default CommentList;

import React, { useRef } from "react";
import { Comment } from "../../interfaces/comment";
import CommentItem from "../CommentItem/CommentItem";
import styles from "./CommentList.module.scss";

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  // Хранилище рефов для комментариев
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Функция для прокрутки к комментарию
  const scrollToComment = (commentId: string) => {
    const element = commentRefs.current[commentId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentRef={(el) => (commentRefs.current[comment.id] = el)}
          scrollToComment={scrollToComment}
        />
      ))}
    </div>
  );
};

export default CommentList;

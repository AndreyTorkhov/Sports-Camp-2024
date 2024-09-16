import React, { useRef } from "react";
import { Comment } from "../../interfaces/comment";
import CommentItem from "../CommentItem/CommentItem";
import styles from "./CommentList.module.scss";

interface CommentListProps {
  comments: Comment[];
  onAddComment: (newComment: Comment) => void; // Новый пропс для добавления комментария
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onAddComment,
}) => {
  const commentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToComment = (commentId: string) => {
    const commentElement = commentRefs.current[commentId];
    if (commentElement) {
      commentElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReply = (parentComment: Comment, text: string) => {
    const newComment: Comment = {
      id: new Date().getTime().toString(), // Генерируем уникальный ID
      text,
      parentComment, // Передаем весь объект родительского комментария
      author: { nick: "Current User" }, // Заглушка для пользователя
      rating: { plus: 0, minus: 0 },
      published: { bunin: new Date().toLocaleDateString() }, // Текущая дата
    };

    onAddComment(newComment); // Добавляем новый комментарий
  };

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          commentRef={(el) => (commentRefs.current[comment.id] = el)}
          scrollToComment={scrollToComment}
          onReply={handleReply}
        />
      ))}
    </div>
  );
};

export default CommentList;

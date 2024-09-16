import React from "react";
import { Comment } from "../../interfaces/comment";
import styles from "./CommentItem.module.scss"; // Подключаем стили

interface CommentItemProps {
  comment: Comment;
  commentRef: React.RefCallback<HTMLDivElement>; // Реф для комментария
  scrollToComment: (commentId: string) => void; // Функция для прокрутки
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  commentRef,
  scrollToComment,
}) => {
  const ratingDifference = comment.rating.plus - comment.rating.minus;

  const handleScrollToParentComment = () => {
    if (comment.parentComment && comment.parentComment.id) {
      scrollToComment(comment.parentComment.id);
    }
  };

  return (
    <div className={styles.commentCard} ref={commentRef}>
      {/* Верхняя часть с пользователем и временем */}
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <div>
            <span className={styles.userName}>{comment.author.nick}</span>
            <span className={styles.commentDate}>
              {comment.published.bunin}
            </span>
          </div>
        </div>
        <button className={styles.moreButton}>...</button>
      </div>

      {/* Ответ на комментарий */}
      {comment.parentComment && (
        <div className={styles.replyTo} onClick={handleScrollToParentComment}>
          Ответ на комментарий: "{comment.parentComment.text?.substring(0, 30)}
          ..."
        </div>
      )}

      {/* Основной текст комментария */}
      <div className={styles.commentBody}>
        <p className={styles.commentText}>{comment.text}</p>
      </div>

      {/* Рейтинг */}
      <div className={styles.commentFooter}>
        <div className={styles.ratingButtons}>
          <button className={styles.ratingButton}>+</button>
          <span className={styles.ratingResult}>{ratingDifference}</span>
          <button className={styles.ratingButton}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

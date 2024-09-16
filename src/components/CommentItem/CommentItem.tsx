import React, { useState } from "react";
import { Comment } from "../../interfaces/comment";
import styles from "./CommentItem.module.scss";

interface CommentItemProps {
  comment: Comment;
  commentRef: React.RefCallback<HTMLDivElement>;
  scrollToComment: (commentId: string) => void;
  onReply: (parentComment: Comment, text: string) => void; // Принимаем объект комментария
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  commentRef,
  scrollToComment,
  onReply,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const ratingDifference = comment.rating.plus - comment.rating.minus;

  const handleScrollToParentComment = () => {
    if (comment.parentComment && comment.parentComment.id) {
      scrollToComment(comment.parentComment.id);
    }
  };

  const handleReplyClick = () => {
    setIsReplying(!isReplying); // Показываем или скрываем поле ввода комментария
  };

  const handleReplySubmit = () => {
    onReply(comment, replyText); // Передаем весь объект комментария
    setReplyText(""); // Очищаем поле
    setIsReplying(false); // Закрываем форму ответа
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

      {/* Рейтинг и кнопка ответить */}
      <div className={styles.commentFooter}>
        <button className={styles.replyButton} onClick={handleReplyClick}>
          Ответить
        </button>
        <div className={styles.ratingButtons}>
          <button className={styles.ratingButton}>+</button>
          <span className={styles.ratingResult}>{ratingDifference}</span>
          <button className={styles.ratingButton}>-</button>
        </div>
      </div>

      {/* Форма для ввода ответа */}
      {isReplying && (
        <div className={styles.replyForm}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Ваш ответ..."
          />
          <button onClick={handleReplySubmit}>Отправить</button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;

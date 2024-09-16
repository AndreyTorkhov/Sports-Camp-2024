import React, { useState } from "react";
import styles from "./NewCommentForm.module.scss";
import classNames from "classnames";
import { Comment } from "../../interfaces/comment";

interface NewCommentFormProps {
  onAddComment: (newComment: Comment) => void;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleInputClick = () => {
    setIsExpanded(true);
  };

  const handleButtonClick = () => {
    if (commentText.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        text: commentText.trim(),
        author: { nick: "user" },
        published: { bunin: new Date().toISOString() },
        rating: { plus: 0, minus: 0 },
        replies: [],
      };
      onAddComment(newComment);
      setCommentText("");
      setIsExpanded(false);
    }
  };

  const isSendButtonActive = commentText.trim().length > 0;

  return (
    <div
      className={classNames(styles.newCommentForm, {
        [styles.expanded]: isExpanded,
      })}
    >
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.newCommentInput}
          placeholder="Написать комментарий..."
          value={commentText}
          onChange={handleInputChange}
          onClick={handleInputClick}
        />
        <div className={styles.iconsContainer}>
          <div className={styles.icon} />
          <div className={styles.icon} />
          <div className={styles.icon} />
        </div>
      </div>
      {isExpanded && (
        <div className={styles.sendButtonContainer}>
          <h1 className={styles.tolltip}>
            <span>Пишите корректно и дружелюбно.</span> Принципы нашей модерации
          </h1>
          <button
            className={classNames(styles.sendButton, {
              [styles.active]: isSendButtonActive,
            })}
            onClick={handleButtonClick}
            disabled={!isSendButtonActive}
          >
            Отправить
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCommentForm;

// NewCommentForm.tsx
import React, { useState, KeyboardEvent } from "react";
import { Comment } from "../../interfaces/comment";
import { handleCommentSubmit } from "../../services/handleCommentSubmit";
import styles from "./NewCommentForm.module.scss";

interface NewCommentFormProps {
  onAddComment: (newComment: Comment) => void;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    handleCommentSubmit(event, commentText, onAddComment, setCommentText);
  };

  return (
    <div className={styles.newCommentForm}>
      <input
        type="text"
        className={styles.newCommentInput}
        placeholder="Напишите комментарий..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default NewCommentForm;

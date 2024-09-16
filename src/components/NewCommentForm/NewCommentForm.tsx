import { useState, KeyboardEvent } from "react";
import { Comment } from "../../interfaces/comment";
import styles from "./NewCommentForm.module.scss";

interface NewCommentFormProps {
  onAddComment: (newComment: Comment) => void;
}

const NewCommentForm: React.FC<NewCommentFormProps> = ({ onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  // Обработка нажатия клавиш
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (commentText.trim()) {
        onAddComment({
          id: Date.now().toString(), // Генерация уникального ID для нового комментария
          text: commentText.trim(),
          author: { nick: "user" }, // Пример данных пользователя
          published: { bunin: new Date().toISOString() },
          rating: { plus: 0, minus: 0 },
          replies: [], // Изначально нет ответов
        });
        setCommentText(""); // Очистка поля ввода
      }
    }
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

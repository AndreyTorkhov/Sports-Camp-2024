import { KeyboardEvent } from "react";
import { Comment } from "../interfaces/comment";

// Функция для обработки нажатия клавиши Enter
export const handleCommentKeyDown = (
  event: KeyboardEvent<HTMLInputElement>,
  onAddComment: (newComment: Comment) => void
) => {
  if (event.key === "Enter" && event.currentTarget.value.trim()) {
    onAddComment({
      id: Date.now().toString(),
      text: event.currentTarget.value.trim(),
      author: { nick: "user" }, // Пример данных пользователя
      published: { bunin: new Date().toISOString() },
      rating: { plus: 0, minus: 0 },
      replies: [],
    });
    event.currentTarget.value = ""; // Очистка поля ввода
  }
};

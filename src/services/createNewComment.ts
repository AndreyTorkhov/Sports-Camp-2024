import { Comment } from "../interfaces/comment";

// Функция для создания нового комментария
export const createNewComment = (
  text: string,
  parentComment: Comment
): Comment => {
  return {
    id: new Date().getTime().toString(), // Генерация уникального ID
    text,
    parentComment,
    author: { nick: "Current User" }, // Заглушка для пользователя
    rating: { plus: 0, minus: 0 },
    published: { bunin: new Date().toLocaleDateString() }, // Текущая дата
  };
};

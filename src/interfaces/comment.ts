export interface Comment {
  id: string;
  text: string;
  author: {
    nick: string;
  };
  picture?: File; // Возможно, нужно будет обновить в зависимости от вашего способа обработки изображений
  published: {
    bunin: string;
  };
  rating: {
    plus: number;
    minus: number;
  };
  parentComment?: Comment;
  replies?: Comment[];
}

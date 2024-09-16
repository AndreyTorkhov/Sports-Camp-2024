import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://www.sports.ru/gql/graphql/?query=%7BcommentQueries%20%7Blist%20%28objectClass%3A%20POST%2C%20objectId%3A%20%223262346%22%2C%20order%3A%20BEST%2C%20first%3A%207%29%20%7Bcomments%20%7Bid%20text%20author%20%7Bnick%20id%20picture%20%7Burl%7D%7D%20published%20%7Bbunin%7D%20rating%20%7Bplus%20minus%7D%20parentComment%20%7Bid%20author%20%7Bnick%20id%20picture%20%7Burl%7D%7D%20text%7D%7D%7D%7D%7D"
      );

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (
        data.data &&
        data.data.commentQueries &&
        data.data.commentQueries.list
      ) {
        return data.data.commentQueries.list.comments;
      } else {
        throw new Error("Неправильная структура ответа API");
      }
    } catch (error: any) {
      console.error("Ошибка при получении комментариев:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

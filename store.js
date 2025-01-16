import { configureStore, createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    savedArticles: [], // Array to hold saved articles
  },
  reducers: {
    saveArticle: (state, action) => {
      const { article, docId } = action.payload;
      state.savedArticles.push({ ...article, docId });
    },
    deleteArticle: (state, action) => {
      state.savedArticles = state.savedArticles.filter(
        (saved) => saved.docId !== action.payload
      );
    },
  },
});

export const { saveArticle, deleteArticle } = articlesSlice.actions;

const store = configureStore({
  reducer: {
    articles: articlesSlice.reducer,
  },
});

export default store;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllArticles, getArticleById } from "./articlesServices";
import { Article, ArticlesResponse } from "./types";

// Type definition for the articles state
interface ArticlesState {
  list: Article[];
  item: Article | null;
  selectedId: string;
  // Pagination state
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  total: number;
  // Loading states
  loadingList: boolean;
  loadingMore: boolean; // New loading state for infinite scroll
  loadingItem: boolean;
  // Error states
  errorList: string | null;
  errorItem: string | null;
}

const initialState: ArticlesState = {
  list: [],
  item: null,
  selectedId: "",
  // Pagination initial values
  currentPage: 0,
  totalPages: 0,
  hasNext: false,
  total: 0,
  // Loading initial values
  loadingList: false,
  loadingMore: false,
  loadingItem: false,
  // Error initial values
  errorList: null,
  errorItem: null,
};

// Async thunk for fetching first page of articles
export const fetchArticles = createAsyncThunk("articles/fetchAll", async () => {
  const data: ArticlesResponse = await getAllArticles(1, 50);
  return data;
});

// Async thunk for fetching more articles (infinite scroll)
export const fetchMoreArticles = createAsyncThunk(
  "articles/fetchMore", 
  async (page: number) => {
    const data: ArticlesResponse = await getAllArticles(page, 50);
    return data;
  }
);

// Async thunk for fetching single article by ID
export const fetchArticleById = createAsyncThunk("articles/fetchById", async (id: string) => {
  const data = await getArticleById(id);
  return data;
});

// Redux slice for articles
const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticleId: (state, action) => {
      state.selectedId = action.payload;
    },
    clearSelectedArticle: (state) => {
      state.item = null;
      state.selectedId = "";
      state.errorItem = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch first page of articles
      .addCase(fetchArticles.pending, (state) => {
        state.loadingList = true;
        state.errorList = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loadingList = false;
        state.list = action.payload.items;
        state.currentPage = action.payload.page;
        state.totalPages = action.payload.total_pages;
        state.hasNext = action.payload.has_next;
        state.total = action.payload.total;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loadingList = false;
        state.errorList = action.error.message || "Failed to fetch articles";
      })
      // Fetch more articles for infinite scroll
      .addCase(fetchMoreArticles.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(fetchMoreArticles.fulfilled, (state, action) => {
        state.loadingMore = false;
        // Append new articles to existing list (infinite scroll)
        state.list = [...state.list, ...action.payload.items];
        state.currentPage = action.payload.page;
        state.hasNext = action.payload.has_next;
      })
      .addCase(fetchMoreArticles.rejected, (state, action) => {
        state.loadingMore = false;
        state.errorList = action.error.message || "Failed to fetch more articles";
      })
      // Fetch single article
      .addCase(fetchArticleById.pending, (state) => {
        state.loadingItem = true;
        state.errorItem = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.item = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loadingItem = false;
        state.errorItem = action.error.message || "Failed to fetch article";
      });
  },
});

export default articlesSlice.reducer;
export const { setArticleId, clearSelectedArticle } = articlesSlice.actions;
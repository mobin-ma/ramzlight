import { RootState } from "@/store/store";

// ArticlesList Component
export const selectArticlesState = (state: RootState) => state.articles;

export const selectArticlesList = (state: RootState) => state.articles.list;

export const selectArticlesLoading = (state: RootState) =>
  state.articles.loadingList;

export const selectArticlesError = (state: RootState) =>
  state.articles.errorList;

export const selectArticlesLoadingMore = (state: RootState) =>
  state.articles.loadingMore;

export const selectArticlesId = (state: RootState) => state.articles.selectedId;

export const selectHasNextArticles = (state: RootState) =>
  state.articles.hasNext;

export const selectCurrentArticlesPage = (state: RootState) =>
  state.articles.currentPage;

// MainArticle Component
export const selectArticleItem = (state: RootState) =>
  state.articles.item;

export const selectArticleLoading = (state: RootState) =>
  state.articles.loadingItem;
  
export const selectArticleError = (state: RootState) =>
  state.articles.errorItem;
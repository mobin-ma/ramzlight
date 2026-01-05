// Centralized endpoints for API
// All API endpoints centralized here
// Change URL only in one place

export const endpoints = {
  articles: "/articles",
  articleById: (id: string) => `/articles/${id}`,
};

import api from "@/services/axios";
import { endpoints } from "@/services/endpoints";

// Service for articles
// Calls the API and returns JSON data

// Get all articles with pagination support
export const getAllArticles = async (page: number = 1, pageSize: number = 50) => {
  const res = await api.get(`${endpoints.articles}?page=${page}&page_size=${pageSize}`);
  return res.data;
};

// Get single article by ID
export const getArticleById = async (id: string) => {
  const res = await api.get(endpoints.articleById(id));
  return res.data;
};


import api from "@/services/axios";
import { endpoints } from "@/services/endpoints";
import { PAGINATION } from "@/constants";

// Service for articles
// Calls the API and returns JSON data

// Get all articles with pagination support
export const getAllArticles = async (page: number = 1, pageSize: number = PAGINATION.DEFAULT_PAGE_SIZE) => {
  try {
    console.log(`Fetching articles: ${endpoints.articles}?page=${page}&page_size=${pageSize}`);
    const res = await api.get(`${endpoints.articles}?page=${page}&page_size=${pageSize}`);
    console.log('Articles response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

// Get single article by ID
export const getArticleById = async (id: string) => {
  try {
    console.log(`Fetching article by ID: ${endpoints.articleById(id)}`);
    const res = await api.get(endpoints.articleById(id));
    console.log('Article response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    throw error;
  }
};


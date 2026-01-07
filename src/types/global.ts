// Global type definitions
export * from "@/features/articles/types";
export * from "@/features/auth/types";

// Common UI component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Pagination interface
export interface PaginationMeta {
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}
// Type definition for the article
export interface Article {
    _id: string;
    contents: {
        fa: {
            title: string;
            body: string;
        }
    }
    source_url: string;
    source_site: string;
    sentiment_score: number;
    tags: string[];
    article_published_date_at_source_site: string;
    article_published_date_at_source_site_jalali: string;
}

// Type definition for API response with pagination
export interface ArticlesResponse {
    items: Article[];
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
    has_next: boolean;
    has_previous: boolean;
}
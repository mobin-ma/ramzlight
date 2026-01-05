"use client";

import { useEffect, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchArticles, fetchMoreArticles, fetchArticleById, setArticleId } from "@/features/articles/articlesSlice";
import { Article } from "@/features/articles/articles.types";
import Loading from "@/components/ui/Loading";
import moment from "moment";

// Set locale to Persian
moment.locale('fa');

// Function to calculate relative time using moment.js
const getRelativeTime = (gregorianDate?: string) => {
  try {
    let publishMoment;
    publishMoment = moment(gregorianDate);


    if (!publishMoment.isValid()) {
      return 'تاریخ نامعتبر';
    }

    const now = moment();

    // Calculating time difference
    const diffInMinutes = now.diff(publishMoment, 'minutes');
    const diffInHours = now.diff(publishMoment, 'hours');
    const diffInDays = now.diff(publishMoment, 'days');
    const diffInWeeks = now.diff(publishMoment, 'weeks');
    const diffInMonths = now.diff(publishMoment, 'months');
    const diffInYears = now.diff(publishMoment, 'years');

    // If the date is in the future
    if (diffInMinutes < 0) {
      return "تازه منتشر شده";
    }

    if (diffInMinutes < 1) {
      return "همین الان";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} دقیقه پیش`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ساعت پیش`;
    } else if (diffInDays < 7) {
      return `${diffInDays} روز پیش`;
    } else if (diffInWeeks < 4) {
      return `${diffInWeeks} هفته پیش`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} ماه پیش`;
    } else if (diffInYears < 10) {
      return `${diffInYears} سال پیش`;
    } else {
      return 'خیلی قدیمی';
    }

  } catch (error) {
    console.error("Error parsing date:", error, "Gregorian:", gregorianDate);
    return 'نامشخص';
  }
};


function ArticlesList() {
  const dispatch = useAppDispatch();
  const { 
    list: articles, 
    loadingList, 
    loadingMore, 
    errorList, 
    selectedId, 
    hasNext, 
    currentPage 
  } = useAppSelector((state) => state.articles);

  // Ref for intersection observer
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch initial articles on component mount
  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  // Handle article click
  const handleArticleClick = (articleId: string) => {
    dispatch(setArticleId(articleId));
    dispatch(fetchArticleById(articleId));
  };

  // Load more articles function
  const loadMoreArticles = useCallback(() => {
    // Only load more if we have next page and not currently loading
    if (hasNext && !loadingMore && !loadingList) {
      dispatch(fetchMoreArticles(currentPage + 1));
    }
  }, [dispatch, hasNext, loadingMore, loadingList, currentPage]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        // When the target element is visible, load more articles
        if (target.isIntersecting) {
          loadMoreArticles();
        }
      },
      {
        // Trigger when element is 100px away from viewport
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup observer on unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMoreArticles]);

  // Loading state for initial fetch
  if (loadingList && articles.length === 0) {
    return (
      <Loading />
    );
  }

  // Error state
  if (errorList && articles.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 animate-fade-in-up">
        <div className="text-red-400">خطا: {errorList}</div>
      </div>
    );
  }

  return (
    <div className="text-white">
      {/* Articles List */}
      <div className="space-y-3 px-4">
        {Array.isArray(articles) && articles.map((article: Article, index) => (
          <div 
            key={article._id} 
            className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-[1.02] animate-fade-in-up ${
              selectedId === article._id 
                ? 'bg-gray-800/70 border-l-2 border-orange-500 shadow-lg' 
                : 'hover:bg-gray-800/50'
            }`}
            style={{ animationDelay: `${(index % 10) * 0.1}s` }} // Stagger animation for new items
            onClick={() => handleArticleClick(article._id)}
          >
            {/* Left border indicator */}
            <div className={`w-1 h-12 rounded-full shrink-0 mt-1 transition-all duration-300 ${
              selectedId === article._id ? 'bg-orange-400 shadow-orange-500/50 shadow-sm' : 'bg-orange-500'
            }`}></div>
            
            {/* Article content */}
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className={`font-medium text-sm leading-relaxed line-clamp-2 text-right transition-all duration-300 ${
                selectedId === article._id ? 'text-orange-100' : 'text-white'
              }`}>
                {article.contents.fa.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-2 transition-smooth hover:text-orange-400">
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    selectedId === article._id ? 'bg-orange-400' : 'bg-green-500'
                  }`}></div>
                  <a href={article.source_url} className="transition-smooth">{article.source_site}</a>
                </div>
                <span className="text-right transition-smooth">
                  {getRelativeTime(article.article_published_date_at_source_site)}
                </span>
              </div>
            </div>

            {/* Selection indicator */}
            {selectedId === article._id && (
              <div className="shrink-0 animate-scale-in">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Infinite scroll trigger element */}
      {hasNext && (
        <div 
          ref={loadMoreRef} 
          className="px-4 py-4"
        >
          {/* Show loading component when fetching more articles */}
          {loadingMore && <Loading />}
        </div>
      )}

      {/* End of list indicator */}
      {!hasNext && articles.length > 0 && (
        <div className="px-4 py-4 text-center">
          <span className="text-gray-500 text-sm">همه مقالات نمایش داده شد</span>
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
"use client";

import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { Article } from "@/features/articles/articles.types";
import { FaLink } from "react-icons/fa";
import moment from "moment";
import "moment/locale/fa"; // فارسی locale
import Loading from "../ui/Loading";

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

function MainArticle() {
  const { list: articles, item, loadingItem, errorItem } = useAppSelector((state) => state.articles);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayArticle, setDisplayArticle] = useState<Article | null>(null);

  // If no article is selected, display the first article.
  const currentArticle = item || (Array.isArray(articles) && articles.length > 0 ? articles[0] : null);

  useEffect(() => {
    if (currentArticle && currentArticle !== displayArticle) {
      setIsAnimating(true);

      // Slight delay for exit animation
      setTimeout(() => {
        setDisplayArticle(currentArticle);
        setIsAnimating(false);
      }, 1000);
    }
  }, [currentArticle, displayArticle]);

  if (loadingItem) {
    return (
      <Loading />
    );
  }

  if (errorItem) {
    return (
      <div className="flex justify-center items-center h-96 animate-fade-in-up">
        <div className="text-red-400">خطا در بارگذاری مقاله: {errorItem}</div>
      </div>
    );
  }

  if (!displayArticle) {
    return (
      <div className="flex justify-center items-center h-96 animate-fade-in-up">
        <div className="text-gray-400">مقاله‌ای برای نمایش وجود ندارد</div>
      </div>
    );
  }

  return (
    <div className="text-white p-8 h-full scrollable">
      {/* Main Article */}
      <div className={`max-w-4xl transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-y-5' : 'opacity-100 transform translate-y-0'
        }`}>
        {/* Panic Score */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-left">
          <div className="flex items-center space-x-4">
            <div className="text-right animate-scale-in animate-stagger-1">
              <div className="text-sm text-gray-400 mb-1">Panic Score</div>
              <div className="text-orange-400 font-bold text-3xl transition-bounce">
                {displayArticle.sentiment_score ? Math.abs(displayArticle.sentiment_score).toFixed(0) : '0'}
              </div>
            </div>
            {/* Gauge visualization */}
            <div className="w-24 h-12 relative animate-scale-in animate-stagger-2">
              <div className="absolute inset-0 border-4 border-gray-700 rounded-full border-b-orange-500 transition-smooth"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-8 bg-orange-500 rounded-full origin-bottom rotate-45 transition-bounce"></div>
            </div>
          </div>
        </div>

        {/* Article Title */}
        <h1 className="text-3xl font-bold text-white mb-4 leading-relaxed text-right animate-fade-in-up animate-stagger-1">
          {displayArticle.contents.fa.title}
        </h1>

        {/* Article Meta */}
        <div className="flex items-center space-x-4 text-sm text-gray-400 mb-6 animate-fade-in-up animate-stagger-2">
          <div className="flex items-center space-x-2 transition-smooth text-blue-400 hover:text-blue-300 transition-bounce transform hover:scale-105">
            <a href={displayArticle.source_url} className="flex items-center gap-3">
              <FaLink />
              {displayArticle.source_site}
            </a>
          </div>
          <span className="transition-smooth">
            {getRelativeTime(displayArticle.article_published_date_at_source_site)}
          </span>

        </div>

        {/* Article Body */}
        <div className="text-gray-300 leading-relaxed text-right mb-8 animate-fade-in-up animate-stagger-3">
          <p className="transition-smooth">{displayArticle.contents.fa.body}</p>
        </div>

        {/* Tags */}
        {displayArticle.tags && displayArticle.tags.length > 0 && (
          <div className="mb-6 animate-slide-in-right animate-stagger-4">
            <div className="text-sm text-gray-400 mb-2">برچسب‌ها:</div>
            <div className="flex flex-wrap gap-2">
              {displayArticle.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs transition-bounce hover:bg-gray-700 hover:scale-105 transform cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interaction Section */}
        <div className="border-t border-gray-800 pt-6 animate-fade-in-up animate-stagger-4">
          <div className="text-gray-400 mb-4 transition-smooth">نظر شما چیست؟</div>

          <div className="flex items-center space-x-4 mb-4">
            <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-bounce transform hover:scale-110">
              <span className="animate-scale-in">👍</span>
              <span>صعودی</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-bounce transform hover:scale-110">
              <span className="animate-scale-in animate-stagger-1">👎</span>
              <span>نزولی</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-bounce transform hover:scale-110">
              <span className="animate-scale-in animate-stagger-2">⭐</span>
              <span>ذخیره</span>
            </button>
          </div>

          {/* Comment Section */}
          <div className="bg-gray-800 rounded-lg p-4 transition-smooth hover:bg-gray-750 animate-fade-in-up animate-stagger-4">
            <textarea
              placeholder="نظر خود را بنویسید..."
              className="w-full bg-transparent text-white placeholder-gray-400 resize-none outline-none text-right transition-smooth focus:placeholder-gray-500"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainArticle;
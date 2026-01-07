// Centralized date utilities
import moment from "moment";
import "moment/locale/fa"; // فارسی locale

// Set locale to Persian
moment.locale('fa');

// Function to calculate relative time using moment.js
export const getRelativeTime = (gregorianDate?: string): string => {
  try {
    const publishMoment = moment(gregorianDate);

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
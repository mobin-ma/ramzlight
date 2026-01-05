# Requirements Document

## Introduction

این سیستم برای نمایش لیست مقالات خبری مربوط به ارزهای دیجیتال طراحی شده است. کاربران باید بتوانند لیست مقالات را مشاهده کرده و جزئیات هر مقاله را ببینند.

## Glossary

- **Article**: مقاله خبری شامل عنوان، متن، منبع و اطلاعات مربوطه
- **Sentiment_Score**: امتیاز احساسات مقاله (مثبت، منفی، خنثی)
- **Articles_List**: لیست کامل مقالات دریافتی از API
- **Article_Card**: کامپوننت نمایش خلاصه مقاله در لیست
- **Main_Display**: ناحیه اصلی نمایش جزئیات مقاله انتخاب شده
- **API_Service**: سرویس دریافت داده از backend

## Requirements

### Requirement 1: دریافت لیست مقالات

**User Story:** به عنوان کاربر، می‌خواهم لیست مقالات را مشاهده کنم تا بتوانم آخرین اخبار را دنبال کنم.

#### Acceptance Criteria

1. WHEN صفحه بارگذاری می‌شود، THE Articles_List SHALL درخواست لیست مقالات را از API ارسال کند
2. WHEN API پاسخ موفق برمی‌گرداند، THE Articles_List SHALL مقالات را در state ذخیره کند
3. WHEN API خطا برمی‌گرداند، THE Articles_List SHALL پیام خطای مناسب نمایش دهد
4. WHILE درخواست در حال پردازش است، THE Articles_List SHALL نشانگر loading نمایش دهد

### Requirement 2: نمایش لیست مقالات در Sidebar

**User Story:** به عنوان کاربر، می‌خواهم لیست مقالات را در sidebar ببینم تا بتوانم به راحتی بین مقالات جابجا شوم.

#### Acceptance Criteria

1. THE Articles_List SHALL هر مقاله را به صورت Article_Card در sidebar نمایش دهد
2. WHEN مقاله‌ای در لیست وجود دارد، THE Article_Card SHALL عنوان مقاله را نمایش دهد
3. WHEN مقاله‌ای در لیست وجود دارد، THE Article_Card SHALL منبع مقاله را نمایش دهد
4. WHEN مقاله‌ای در لیست وجود دارد، THE Article_Card SHALL زمان انتشار را نمایش دهد
5. WHEN مقاله‌ای در لیست وجود دارد، THE Article_Card SHALL sentiment score را نمایش دهد

### Requirement 3: انتخاب و نمایش جزئیات مقاله

**User Story:** به عنوان کاربر، می‌خواهم روی مقاله کلیک کنم تا جزئیات کامل آن را ببینم.

#### Acceptance Criteria

1. WHEN کاربر روی Article_Card کلیک می‌کند، THE Main_Display SHALL جزئیات کامل مقاله را نمایش دهد
2. WHEN مقاله انتخاب می‌شود، THE Article_Card SHALL به صورت active نمایش داده شود
3. WHEN جزئیات مقاله نمایش داده می‌شود، THE Main_Display SHALL عنوان کامل مقاله را نمایش دهد
4. WHEN جزئیات مقاله نمایش داده می‌شود، THE Main_Display SHALL متن کامل مقاله را نمایش دهد
5. WHEN جزئیات مقاله نمایش داده می‌شود، THE Main_Display SHALL لینک منبع اصلی را نمایش دهد

### Requirement 4: مدیریت حالت‌های مختلف UI

**User Story:** به عنوان کاربر، می‌خواهم وضعیت سیستم را به وضوح ببینم تا بدانم چه اتفاقی در حال رخ دادن است.

#### Acceptance Criteria

1. WHEN هیچ مقاله‌ای وجود ندارد، THE Articles_List SHALL پیام "مقاله‌ای یافت نشد" نمایش دهد
2. WHEN سیستم در حال بارگذاری است، THE Articles_List SHALL نشانگر loading نمایش دهد
3. IF خطایی رخ دهد، THEN THE Articles_List SHALL پیام خطای واضح و قابل فهم نمایش دهد
4. WHEN مقاله‌ای انتخاب نشده باشد، THE Main_Display SHALL پیام راهنما نمایش دهد

### Requirement 5: طراحی واکنش‌گرا (Responsive Design)

**User Story:** به عنوان کاربر، می‌خواهم سایت در دستگاه‌های مختلف به درستی کار کند.

#### Acceptance Criteria

1. THE Articles_List SHALL در دستگاه‌های موبایل به صورت عمودی نمایش داده شود
2. THE Articles_List SHALL در دستگاه‌های دسکتاپ به صورت sidebar نمایش داده شود
3. WHEN اندازه صفحه تغییر می‌کند، THE layout SHALL به طور خودکار تطبیق یابد
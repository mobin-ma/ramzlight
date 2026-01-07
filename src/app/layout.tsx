import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import { Header } from "@/components/layout";
import { AuthGuard } from "@/features/auth/components";
import { ErrorBoundary } from "@/components";


export const metadata: Metadata = {
  title: 'رمز لایت | اخبار کریپتو',
  description: 'اخبار کریپتو و احساسات بازار در لحظه',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="">
        {/* Redux Provider wraps the entire app */}
        <ReduxProvider>
          <ErrorBoundary>
            <AuthGuard>
              {/* header */}
              <Header />
              
              {/* Main Content - Let pages handle their own layout */}
              <main className="w-full min-h-[calc(100vh-80px)] p-3 sm:p-5 lg:p-7">
                {children}
              </main>
            </AuthGuard>
          </ErrorBoundary>
        </ReduxProvider>
      </body>
    </html>
  );
}

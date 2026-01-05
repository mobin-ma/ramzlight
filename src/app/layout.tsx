import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "@/store/ReduxProvider";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import AuthGuard from "@/components/auth/AuthGuard";


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
      <body
        className=""
      >
        {/* Redux Provider wraps the entire app */}
        <ReduxProvider>
          <AuthGuard>
            {/* header */}
            <Header />
            <main className="w-full h-[87vh] flex p-7 gap-7">
              <Sidebar />
              {children}
            </main>
          </AuthGuard>
        </ReduxProvider>
      </body>
    </html>
  );
}

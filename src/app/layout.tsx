import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://midwestedu.vercel.app"),
  title: {
    default: "Midwest University — St. Louis, Missouri",
    template: "%s | Midwest University",
  },
  description:
    "Midwest University is a private institution of higher education in the St. Louis metropolitan area, offering ESL, bachelor's, master's, and doctoral programs on campus and online.",
  openGraph: {
    title: "Midwest University — St. Louis, Missouri",
    description:
      "Scholarship anchored in purpose. ESL, bachelor's, master's, and doctoral programs in Wentzville, Missouri.",
    images: [{ url: "/media/img/04student/03-01_.jpg", width: 1600, height: 900 }],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

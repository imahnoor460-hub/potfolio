import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import ParallaxBackground from "@/components/ParallaxBackground";
import ChatWidget from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahnooriftikhar.online"),

  title: {
    default: "Mahnoor Iftikhar | Full-Stack Developer & AI Engineer",
    template: "%s | Mahnoor Iftikhar",
  },

  description:
    "Mahnoor Iftikhar is a Computer Science student and Full-Stack Developer specializing in React, Next.js, Python, AI, LLMs, and modern web applications.",

  keywords: [
    "Mahnoor Iftikhar",
    "Mahnoor Iftikhar portfolio",
    "Full-Stack Developer",
    "AI Engineer",
    "AI Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "Computer Science Student",
    "Pakistan Developer",
  ],

  authors: [{ name: "Mahnoor Iftikhar" }],
  creator: "Mahnoor Iftikhar",

  alternates: {
    canonical: "https://www.mahnooriftikhar.online",
  },

  openGraph: {
    type: "website",
    url: "https://www.mahnooriftikhar.online",
    title: "Mahnoor Iftikhar | Full-Stack Developer & AI Engineer",
    description:
      "Portfolio of Mahnoor Iftikhar — Full-Stack Developer and AI Engineer building modern web applications and AI-powered solutions.",
    siteName: "Mahnoor Iftikhar",
    locale: "en_US",
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark'){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
        <ParallaxBackground />
        <div className="cursor-spotlight" aria-hidden />
        <CustomCursor />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}

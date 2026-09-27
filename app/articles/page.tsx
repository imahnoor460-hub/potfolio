import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Articles from "@/components/Articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Articles and write-ups by Mahnoor Iftikhar.",
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
        </div>
        <Articles showIndex={false} />
      </main>
      <Footer showIndex={false} />
    </div>
  );
}

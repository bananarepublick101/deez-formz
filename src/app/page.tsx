import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        Built with Next.js, Tailwind CSS, and shadcn/ui
      </footer>
    </div>
  );
}

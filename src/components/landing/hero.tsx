import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="py-24 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          Build beautiful forms
          <br />
          <span className="text-muted-foreground">that people enjoy filling out</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Create engaging surveys and forms with a conversational experience.
          Get higher completion rates and better data from your audience.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="text-lg px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

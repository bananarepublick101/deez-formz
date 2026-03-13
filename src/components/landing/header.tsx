import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-primary">
          Typeform Clone
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signin">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

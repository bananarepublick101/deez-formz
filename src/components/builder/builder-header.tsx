"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Globe, Link2, Check, MessageSquare } from "lucide-react";

interface BuilderHeaderProps {
  form: {
    id: string;
    title: string;
    published: boolean;
  };
  onTitleChange: (title: string) => void;
  onTogglePublish: () => void;
}

export function BuilderHeader({
  form,
  onTitleChange,
  onTogglePublish,
}: BuilderHeaderProps) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  function copyLink() {
    const url = `${window.location.origin}/form/${form.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Input
          value={form.title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="h-8 w-64 border-none bg-transparent text-lg font-semibold focus-visible:ring-1"
        />
        <Badge variant={form.published ? "default" : "secondary"}>
          {form.published ? "Published" : "Draft"}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        {form.published && (
          <>
            <Button variant="outline" size="sm" onClick={copyLink}>
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Link2 className="mr-2 h-4 w-4" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/form/${form.id}`, "_blank")}
            >
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/forms/${form.id}/responses`)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Responses
        </Button>
        <Button size="sm" onClick={onTogglePublish}>
          <Globe className="mr-2 h-4 w-4" />
          {form.published ? "Unpublish" : "Publish"}
        </Button>
      </div>
    </header>
  );
}

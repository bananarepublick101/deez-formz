"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const PLATFORMS = [
  {
    key: "linkedin",
    label: "LinkedIn",
    placeholder: "linkedin.com/in/yourname",
    prefix: "https://linkedin.com/in/",
    color: "bg-[#0A66C2]",
  },
  {
    key: "instagram",
    label: "Instagram",
    placeholder: "@yourhandle",
    prefix: "https://instagram.com/",
    color: "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
  },
  {
    key: "x",
    label: "X",
    placeholder: "@yourhandle",
    prefix: "https://x.com/",
    color: "bg-black dark:bg-white dark:text-black",
  },
  {
    key: "tiktok",
    label: "TikTok",
    placeholder: "@yourhandle",
    prefix: "https://tiktok.com/@",
    color: "bg-black dark:bg-white dark:text-black",
  },
  {
    key: "other",
    label: "Other",
    placeholder: "Paste your profile link",
    prefix: "",
    color: "bg-muted-foreground",
  },
] as const;

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function parseValue(value: string): { platform: string; handle: string } {
  if (!value) return { platform: "", handle: "" };
  const sepIndex = value.indexOf("::");
  if (sepIndex === -1) return { platform: "", handle: value };
  return {
    platform: value.slice(0, sepIndex),
    handle: value.slice(sepIndex + 2),
  };
}

export function SocialMediaField({ value, onChange }: Props) {
  const parsed = parseValue(value);
  const [platform, setPlatform] = useState(parsed.platform);
  const [handle, setHandle] = useState(parsed.handle);

  useEffect(() => {
    const p = parseValue(value);
    setPlatform(p.platform);
    setHandle(p.handle);
  }, [value]);

  function update(newPlatform: string, newHandle: string) {
    setPlatform(newPlatform);
    setHandle(newHandle);
    if (newPlatform && newHandle) {
      onChange(`${newPlatform}::${newHandle}`);
    } else if (!newPlatform && !newHandle) {
      onChange("");
    } else {
      onChange(`${newPlatform}::${newHandle}`);
    }
  }

  const activePlatform = PLATFORMS.find((p) => p.key === platform);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {PLATFORMS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => update(p.key, handle)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              platform === p.key
                ? `${p.color} text-white shadow-md scale-105`
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {platform && (
        <div className="space-y-1">
          <Input
            type="url"
            value={handle}
            onChange={(e) => update(platform, e.target.value)}
            placeholder={activePlatform?.placeholder ?? "Paste your link"}
            className="border-0 border-b-2 rounded-none bg-transparent text-xl focus-visible:ring-0 focus-visible:border-primary px-0"
            autoFocus
          />
          <p className="text-xs text-muted-foreground">
            Paste your full link or just your handle — either works
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        // ✅ Light theme 기본 스타일 (Input과 100% 통일)
        "w-full min-h-[120px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition resize-y",
        // placeholder
        "placeholder:text-slate-400",
        // hover / focus
        "hover:border-slate-300 focus:border-slate-900 focus:ring-2 focus:ring-slate-200",
        // disabled
        "disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
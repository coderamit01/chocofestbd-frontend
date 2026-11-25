"use client";

import { useEffect, useState } from "react";

export function useObjectUrl(file: File | null) {
  const [url, setUrl] = useState<{ file: File; url: string } | null>(null);

  useEffect(() => {
    if (!file) return;
    const next = URL.createObjectURL(file);
    const timer = setTimeout(() => setUrl({ file, url: next }), 0);
    return () => {
      clearTimeout(timer);
      URL.revokeObjectURL(next);
    };
  }, [file]);

  return file && url?.file === file ? url.url : null;
}

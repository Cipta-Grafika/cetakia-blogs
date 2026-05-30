"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type BlogArticleVideoEmbedProps = {
  url: string;
  title: string;
  describedById?: string;
};

function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace(/^\/+/, "").split("/")[0] ?? null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      const fromQuery = parsed.searchParams.get("v");
      if (fromQuery) return fromQuery;

      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.replace("/embed/", "").split("/")[0] ?? null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function BlogArticleVideoEmbed({ url, title, describedById }: BlogArticleVideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const videoId = useMemo(() => getYouTubeVideoId(url), [url]);
  const embedUrl = useMemo(
    () => (videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : null),
    [videoId],
  );
  const posterUrl = useMemo(() => (videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null), [videoId]);

  if (!videoId || !embedUrl || !posterUrl) {
    return null;
  }

  return (
    <div className="blog-article-video__frame" data-state={isPlaying ? "playing" : "idle"}>
      {isPlaying ? (
        <iframe
          src={embedUrl}
          title={title}
          aria-describedby={describedById}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="blog-article-video__poster"
          onClick={() => setIsPlaying(true)}
          aria-label={`Play video: ${title}`}
          aria-describedby={describedById}
        >
          <Image
            src={posterUrl}
            alt={`Video preview: ${title}`}
            width={1280}
            height={720}
            quality={72}
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 88vw, 62vw"
          />
          <span className="blog-article-video__play-icon" aria-hidden="true">
            <span />
          </span>
        </button>
      )}
    </div>
  );
}

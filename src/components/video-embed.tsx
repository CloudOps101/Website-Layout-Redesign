"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-play Vimeo embed. Shows a lightweight poster first so the page
 * loads fast and no third-party player runs until the visitor asks for it.
 */
export function VideoEmbed({
  vimeoId,
  title,
  poster,
  caption,
}: {
  vimeoId: string;
  title: string;
  poster: StaticImageData;
  caption?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-navy-950 shadow-[var(--shadow-lift)]">
        {playing ? (
          <iframe
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&title=0&byline=0`}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full"
          >
            <Image src={poster} alt="" fill placeholder="blur" sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
            <span aria-hidden className="absolute inset-0 bg-navy-950/20 transition group-hover:bg-navy-950/5" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-gold-500 text-navy-950 shadow-[0_0_0_10px_rgb(242_179_61/0.3)] transition duration-300 group-hover:scale-110 md:size-24">
                <Play aria-hidden className="ml-1 size-8 fill-current" />
              </span>
            </span>
            <span className="eyebrow absolute left-4 top-4 rounded-full bg-navy-950/80 px-3 py-1.5 text-[0.6875rem] text-gold-300 backdrop-blur md:left-6 md:top-6">
              Watch the trailer
            </span>
            <span className="sr-only">Play video: {title}</span>
          </button>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption>}
    </figure>
  );
}

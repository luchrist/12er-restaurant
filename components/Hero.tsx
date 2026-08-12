"use client";

import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS resets `muted` between SPA navigations — force it, otherwise
    // autoplay is rejected outright.
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // iOS Low Power Mode blocks autoplay unconditionally and would paint its
    // own play button over the video (hidden via app/globals.css). We retry
    // play() on every signal that can carry user activation; until playback
    // really runs, the poster <img> stays on top.
    const tryPlay = () => {
      if (cancelled || !video.paused) return;
      video.play().catch(() => {});
    };

    // Only `timeupdate` proves the video is really running: iOS fires
    // `playing` and then pauses again right away under its autoplay policy.
    const onTimeUpdate = () => {
      if (video.currentTime > 0 && !video.paused) setVideoReady(true);
    };
    const onStopped = () => setVideoReady(false);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("pause", onStopped);
    video.addEventListener("ended", onStopped);

    const onLoaded = () => tryPlay();
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("canplay", onLoaded);

    tryPlay();
    [50, 200, 500, 1500, 3000].forEach((ms) => timers.push(setTimeout(tryPlay, ms)));

    // First touch/click unlocks media playback on iOS.
    const gestureEvents = ["touchstart", "touchend", "pointerdown", "click", "scroll", "keydown"] as const;
    const onGesture = () => tryPlay();
    gestureEvents.forEach((ev) => document.addEventListener(ev, onGesture, { passive: true }));

    // Screen unlocked / tab switched back.
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);
    // bfcache restore (back navigation) + window refocus.
    window.addEventListener("pageshow", onGesture);
    window.addEventListener("focus", onGesture);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("pause", onStopped);
      video.removeEventListener("ended", onStopped);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("canplay", onLoaded);
      gestureEvents.forEach((ev) => document.removeEventListener(ev, onGesture));
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pageshow", onGesture);
      window.removeEventListener("focus", onGesture);
    };
  }, []);

  return (
    <section className="relative h-[100dvh] overflow-hidden bg-ink">
      {/* Video background — the poster on top stays visible until
          playback really runs. `isolate` keeps the z-indexes below
          scoped to this container so the scrim above still wins. */}
      <div className="absolute inset-0 isolate">
        {/* The opacity sits on this WRAPPER, not on the <video>: Safari
            draws its native play overlay outside the video's stacking
            context, but not outside the parent's. */}
        <div className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disableRemotePlayback
            controls={false}
            disablePictureInPicture
            {...({ "x-webkit-airplay": "deny", "webkit-playsinline": "true", "x5-playsinline": "true" } as Record<string, string>)}
          >
            <source src="/hero-bg.webm" type="video/webm" />
            {/* H.264 fallback: iOS Safari cannot decode the VP9 webm. */}
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Poster overlay — z-[3] covers the whole video wrapper (incl. any
            native iOS chrome) until `timeupdate` proves playback is really
            running. If iOS blocks autoplay it simply stays. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-poster.webp"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-[3] h-full w-full object-cover transition-opacity duration-700 ${videoReady ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/30" />

      {/* Content */}
      <div className="relative z-20 flex h-full items-end">
        <div className="w-full max-w-[1400px] mx-auto px-6 pb-20 md:px-10 md:pb-28 lg:px-14">
          <div className="max-w-lg">
            <h1 className="font-display text-[36px] leading-[0.95] tracking-tight text-bone sm:text-[44px] md:text-[58px] lg:text-[68px] drop-shadow-lg">
              Gutbürgerlich,
              <br />
              <span className="italic text-messing-200">an der Maaraue.</span>
            </h1>
            <p className="mt-5 max-w-[34ch] text-[15px] leading-relaxed text-bone/85 md:text-[16px] drop-shadow-md">
              Handmade Cordon bleu, der beliebte 12er Salat und ein gespritzter Apfelwein auf der Terrasse direkt am Sportplatz Maaraue.
            </p>
            <div className="mt-6 flex items-center gap-4 md:mt-8">
              <a
                href="#speisekarte"
                className="inline-flex items-center justify-center rounded-full bg-wald-500 px-7 py-3 text-[13px] font-medium tracking-wide text-bone transition-colors hover:bg-wald-600"
              >
                Speisekarte
              </a>
              <a
                href="/reservierung"
                className="inline-flex items-center justify-center rounded-full border border-bone/40 px-7 py-3 text-[13px] font-medium tracking-wide text-bone transition-colors hover:bg-bone/10"
              >
                Reservierung
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

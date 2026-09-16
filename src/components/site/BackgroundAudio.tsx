import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type BackgroundAudioProps = {
  src?: string;
  loop?: boolean;
  volume?: number;
};

/**
 * Ambient background audio.
 *
 * Performance: the audio file is never part of the initial page load. The
 * <audio> element has no src and preload="none" until either autoplay is
 * actually permitted or the visitor interacts with the page, so slow
 * connections spend their bandwidth on content first. Data-saver users never
 * download it at all unless they press the button.
 */
export function BackgroundAudio({ src = "/media/home-ambient.mp3", loop = true, volume = 0.35 }: BackgroundAudioProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false);

  const attach = useCallback(() => {
    const el = ref.current;
    if (!el) return el;
    if (!el.src) {
      el.src = src;
      el.load();
    }
    return el;
  }, [src]);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
      .connection;
    const saveData = Boolean(conn?.saveData) || /(^|-)(2g|slow-2g)$/.test(conn?.effectiveType ?? "");
    let done = false;

    const start = () => {
      if (done) return;
      const el = attach();
      if (!el) return;
      el.volume = volume;
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    // Idle-time attempt (skipped entirely on metered/slow connections).
    let idle = 0;
    if (!saveData) {
      idle = window.setTimeout(start, 1200);
    }

    const onInteract = () => {
      setArmed(true);
      if (!saveData) start();
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
    };
    window.addEventListener("pointerdown", onInteract, { passive: true });
    window.addEventListener("keydown", onInteract);

    const el = ref.current;
    const onEnded = () => {
      done = true;
      setPlaying(false);
    };
    el?.addEventListener("ended", onEnded);

    return () => {
      done = true;
      window.clearTimeout(idle);
      el?.removeEventListener("ended", onEnded);
      window.removeEventListener("pointerdown", onInteract);
      window.removeEventListener("keydown", onInteract);
      el?.pause();
    };
  }, [attach, volume]);

  const toggle = () => {
    const el = attach();
    if (!el) return;
    if (el.paused) {
      el.volume = volume;
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={ref} loop={loop} preload="none" data-armed={armed} />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute background audio" : "Play background audio"}
        className="fixed bottom-5 right-5 z-50 inline-flex size-11 items-center justify-center rounded-full border border-primary/30 bg-card/90 text-primary shadow-elevated backdrop-blur transition-colors hover:bg-accent"
      >
        {playing ? <Volume2 className="size-5" aria-hidden="true" /> : <VolumeX className="size-5" aria-hidden="true" />}
      </button>
    </>
  );
}

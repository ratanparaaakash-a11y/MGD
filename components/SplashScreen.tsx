"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

const SPLASH_FADE_DURATION_MS = 900;

export function SplashScreen() {
  const { active, progress } = useProgress();
  const [showText, setShowText] = useState(false);
  const [showSubText, setShowSubText] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Timed text reveals
  useEffect(() => {
    const t1 = setTimeout(() => setShowText(true), 2000);
    const t2 = setTimeout(() => setShowSubText(true), 3200);
    const t3 = setTimeout(() => setMinTimeElapsed(true), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Fade out once minimum time + model loaded
  useEffect(() => {
    if (!minTimeElapsed || (active && progress !== 100) || isFading) {
      return;
    }

    setIsFading(true);
    const timeout = setTimeout(() => {
      (window as Window & { __muktaSplashComplete?: boolean }).__muktaSplashComplete = true;
      window.dispatchEvent(new Event("mukta:splash-complete"));
      setIsRemoved(true);
    }, SPLASH_FADE_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [minTimeElapsed, active, progress, isFading]);

  if (isRemoved) return null;

  return (
    <div className={`splash-screen ${isFading ? "splash-screen--fading" : ""}`} aria-hidden="true">
      <video autoPlay muted loop playsInline preload="auto" className="splash-video">
        <source src="/video/520.mp4" type="video/mp4" />
      </video>

      <div className="splash-text-overlay">
        <h1 className={`splash-mgd ${showText ? "splash-visible" : ""}`}>MGD</h1>
        <p className={`splash-fullname ${showSubText ? "splash-visible" : ""}`}>
          MUKTA GAME &amp; DEVELOPMENT
        </p>
      </div>
    </div>
  );
}

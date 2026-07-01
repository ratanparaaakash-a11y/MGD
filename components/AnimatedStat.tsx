"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedStatProps {
  value: string;
  label: string;
}

export function AnimatedStat({ value, label }: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const numMatch = value.match(/\d+/);
  const targetNumber = numMatch ? parseInt(numMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && targetNumber > 0) {
      let start = 0;
      const duration = 2000;
      const incrementTime = 20;
      const steps = duration / incrementTime;
      const increment = targetNumber / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= targetNumber) {
          setCount(targetNumber);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, targetNumber]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">
        {targetNumber > 0 ? `${count}${suffix}` : value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

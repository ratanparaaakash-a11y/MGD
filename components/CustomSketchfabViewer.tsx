"use client";
import React, { useEffect, useRef, useState } from "react";

export function CustomSketchfabViewer() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [api, setApi] = useState<any>(null);

  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Camera state
  const camState = useRef({
    distance: 10,
    azimuth: 0,
    polar: Math.PI / 4,
    target: [0, 0, 0] as [number, number, number]
  });

  useEffect(() => {
    if (!iframeRef.current) return;

    // Dynamically require Sketchfab Viewer API to avoid SSR 'self is not defined' error
    const Sketchfab = require("@sketchfab/viewer-api");
    const client = new Sketchfab(iframeRef.current);
    client.init("0d9286ebb8cc426e993e1d398b874a34", {
      autostart: 1,
      ui_infos: 0,
      ui_watermark: 0,
      ui_controls: 0,
      ui_help: 0,
      ui_settings: 0,
      ui_vr: 0,
      ui_fullscreen: 0,
      ui_animations: 0,
      ui_theme: "light",
      dnt: 1,
      transparent: 1,
      scrollwheel: 0,
      success: (sketchfabApi: any) => {
        sketchfabApi.start();
        sketchfabApi.addEventListener("viewerready", () => {
          setApi(sketchfabApi);

          sketchfabApi.getCameraLookAt((err: any, camera: any) => {
            if (!err && camera) {
              const dx = camera.position[0] - camera.target[0];
              const dy = camera.position[1] - camera.target[1];
              const dz = camera.position[2] - camera.target[2];

              const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
              const azimuth = Math.atan2(dy, dx);
              const polar = Math.acos(dz / distance);

              camState.current = {
                distance,
                azimuth,
                polar,
                target: camera.target
              };
            }
          });
        });
      },
      error: () => console.error("Sketchfab API error"),
    });
  }, []);

  const updateCamera = (duration = 0) => {
    if (!api) return;
    const { distance, azimuth, polar, target } = camState.current;

    const x = target[0] + distance * Math.sin(polar) * Math.cos(azimuth);
    const y = target[1] + distance * Math.sin(polar) * Math.sin(azimuth);
    const z = target[2] + distance * Math.cos(polar);

    api.setCameraLookAt([x, y, z], target, duration);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !api) return;

    const fetchCamera = () => {
      api.getCameraLookAt((err: any, camera: any) => {
        if (!err && camera) {
          const dx = camera.position[0] - camera.target[0];
          const dy = camera.position[1] - camera.target[1];
          const dz = camera.position[2] - camera.target[2];
          
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const azimuth = Math.atan2(dy, dx);
          const polar = Math.acos(dz / distance);
          
          camState.current = {
            distance,
            azimuth,
            polar,
            target: camera.target
          };
        }
      });
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      container.setPointerCapture(e.pointerId);
      // Fetch camera just in case, though pointerenter should have caught it
      fetchCamera();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging.current) {
        // Drag to rotate
        const dx = e.clientX - lastMousePos.current.x;
        const dy = e.clientY - lastMousePos.current.y;
        lastMousePos.current = { x: e.clientX, y: e.clientY };

        camState.current.azimuth -= dx * 0.01;
        camState.current.polar -= dy * 0.01;

        // Clamp polar angle to avoid flipping
        camState.current.polar = Math.max(0.1, Math.min(Math.PI - 0.1, camState.current.polar));
        updateCamera(0);
      }
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging.current = false;
      container.releasePointerCapture(e.pointerId);
    };

    const onWheel = (e: WheelEvent) => {
      // Only zoom if dragging (holding click)
      if (isDragging.current) {
        e.preventDefault(); // Prevent page scroll
        camState.current.distance += e.deltaY * 0.02;
        // Clamp distance
        camState.current.distance = Math.max(1, Math.min(1000, camState.current.distance));
        updateCamera(0);
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerenter", fetchCamera);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerenter", fetchCamera);
      container.removeEventListener("wheel", onWheel);
    };
  }, [api]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", touchAction: "none" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10, cursor: "grab" }} />
      <iframe
        ref={iframeRef}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; fullscreen; xr-spatial-tracking"
        style={{ width: "100%", height: "100%", pointerEvents: "none", position: "absolute", top: "-7.5%", left: "-5%" }}
      />
    </div>
  );
}

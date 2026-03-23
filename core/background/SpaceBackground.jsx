import { useEffect, useRef } from "react";
import {
  getSpaceBackgroundBaseLayerStyles,
  getSpaceBackgroundCanvasStyles,
  getSpaceBackgroundGlowLayerStyles,
  getSpaceBackgroundNebulaLayerStyles,
  getSpaceBackgroundOverlayStyles,
  getSpaceBackgroundRootStyles,
} from "./spaceBackground.styles";

const createStars = (width, height) => {
  const area = Math.max(width * height, 1);
  const starCount = Math.min(220, Math.max(90, Math.floor(area / 12000)));

  return Array.from({ length: starCount }, () => {
    const twinkleDuration = 3 + Math.random() * 3;

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() > 0.65 ? 2 : 1,
      alpha: 0.22 + Math.random() * 0.42,
      depth: 0.3 + Math.random() * 0.9,
      twinkleSpeed: (Math.PI * 2) / twinkleDuration,
      twinklePhase: Math.random() * Math.PI * 2,
    };
  });
};

const clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

const SpaceBackground = () => {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const glowLayerRef = useRef(null);
  const nebulaLayerRef = useRef(null);

  useEffect(() => {
    const rootElement = rootRef.current;
    const canvasElement = canvasRef.current;

    if (!rootElement || !canvasElement) {
      return undefined;
    }

    const context = canvasElement.getContext("2d", { alpha: true });

    if (!context) {
      return undefined;
    }

    const scene = {
      width: window.innerWidth,
      height: window.innerHeight,
      stars: [],
      dpr: window.devicePixelRatio || 1,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      frameId: 0,
    };

    const resizeCanvas = () => {
      scene.width = window.innerWidth;
      scene.height = window.innerHeight;
      scene.dpr = window.devicePixelRatio || 1;

      canvasElement.width = Math.floor(scene.width * scene.dpr);
      canvasElement.height = Math.floor(scene.height * scene.dpr);
      canvasElement.style.width = `${scene.width}px`;
      canvasElement.style.height = `${scene.height}px`;

      context.setTransform(scene.dpr, 0, 0, scene.dpr, 0, 0);
      scene.stars = createStars(scene.width, scene.height);
    };

    const draw = (timestampMs) => {
      const timeSeconds = timestampMs * 0.001;

      scene.currentX += (scene.targetX - scene.currentX) * 0.06;
      scene.currentY += (scene.targetY - scene.currentY) * 0.06;

      context.clearRect(0, 0, scene.width, scene.height);

      for (let index = 0; index < scene.stars.length; index += 1) {
        const star = scene.stars[index];
        const twinkleAmount = Math.sin(timeSeconds * star.twinkleSpeed + star.twinklePhase) * 0.18;
        const alpha = clamp(star.alpha + twinkleAmount, 0.08, 0.72);
        const x = star.x + scene.currentX * star.depth;
        const y = star.y + scene.currentY * star.depth;

        context.globalAlpha = alpha;
        context.fillStyle = "#f2f2f2";
        context.beginPath();
        context.arc(x, y, star.size, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;

      if (glowLayerRef.current) {
        glowLayerRef.current.style.transform = `translate3d(${scene.currentX * 0.9}px, ${scene.currentY * 0.9}px, 0)`;
      }

      if (nebulaLayerRef.current) {
        nebulaLayerRef.current.style.transform = `translate3d(${scene.currentX * 0.45}px, ${scene.currentY * 0.45}px, 0)`;
      }

      scene.frameId = window.requestAnimationFrame(draw);
    };

    const handleMouseMove = (event) => {
      const normalizedX = (event.clientX / Math.max(scene.width, 1)) * 2 - 1;
      const normalizedY = (event.clientY / Math.max(scene.height, 1)) * 2 - 1;

      scene.targetX = normalizedX * 12;
      scene.targetY = normalizedY * 8;
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    scene.frameId = window.requestAnimationFrame(draw);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (scene.frameId) {
        window.cancelAnimationFrame(scene.frameId);
      }

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={rootRef} style={getSpaceBackgroundRootStyles()}>
      <span style={getSpaceBackgroundBaseLayerStyles()} />
      <span ref={glowLayerRef} style={getSpaceBackgroundGlowLayerStyles()} />
      <span ref={nebulaLayerRef} style={getSpaceBackgroundNebulaLayerStyles()} />
      <canvas ref={canvasRef} style={getSpaceBackgroundCanvasStyles()} aria-hidden="true" />
      <span style={getSpaceBackgroundOverlayStyles()} />
    </div>
  );
};

export default SpaceBackground;

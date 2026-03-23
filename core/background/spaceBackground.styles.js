export const getSpaceBackgroundRootStyles = () => ({
  position: "fixed",
  inset: 0,
  zIndex: 0,
  overflow: "hidden",
  pointerEvents: "none",
});

export const getSpaceBackgroundBaseLayerStyles = () => ({
  position: "absolute",
  inset: 0,
  background: "radial-gradient(circle at 22% 24%, #070708 0%, #020203 60%, #000000 100%)",
});

export const getSpaceBackgroundGlowLayerStyles = () => ({
  position: "absolute",
  inset: "-8%",
  background:
    "radial-gradient(circle at 18% 20%, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 46%), radial-gradient(circle at 78% 16%, rgba(242, 242, 242, 0.04) 0%, rgba(242, 242, 242, 0) 42%), radial-gradient(circle at 66% 76%, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 44%)",
  transform: "translate3d(0px, 0px, 0)",
  willChange: "transform",
  transition: "transform 260ms ease-out",
});

export const getSpaceBackgroundNebulaLayerStyles = () => ({
  position: "absolute",
  inset: "-10%",
  background:
    "radial-gradient(circle at 30% 72%, rgba(90, 90, 90, 0.08) 0%, rgba(90, 90, 90, 0) 50%), radial-gradient(circle at 74% 62%, rgba(72, 72, 72, 0.08) 0%, rgba(72, 72, 72, 0) 54%)",
  transform: "translate3d(0px, 0px, 0)",
  willChange: "transform",
  transition: "transform 320ms ease-out",
});

export const getSpaceBackgroundCanvasStyles = () => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  display: "block",
});

export const getSpaceBackgroundOverlayStyles = () => ({
  position: "absolute",
  inset: 0,
  background: "rgba(0, 0, 0, 0.5)",
});

import { useState } from "react";
import {
  getAppIconButtonStyles,
  getAppIconGlyphStyles,
  getAppIconLabelStyles,
} from "./desktop.styles";

const AppIcon = ({ label, icon: Icon, onOpen, onPointerDown, isDragging = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <button
      type="button"
      style={getAppIconButtonStyles({ isHovered, isPressed, isFocused })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        setIsPressed(false);
      }}
      onPointerDown={(event) => {
        if (event.button === 0) {
          setIsPressed(true);
        }

        onPointerDown?.(event);
      }}
      onPointerUp={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onClick={(event) => {
        event.preventDefault();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen?.();
        }
      }}
      aria-label={`Open ${label}`}
      aria-grabbed={isDragging}
    >
      <span style={getAppIconGlyphStyles({ isHovered, isFocused })}>{Icon ? <Icon size={18} strokeWidth={2.1} /> : null}</span>
      <p style={getAppIconLabelStyles()}>{label}</p>
    </button>
  );
};

export default AppIcon;

import { useState } from "react";
import {
  getAppIconButtonStyles,
  getAppIconGlyphStyles,
  getAppIconLabelStyles,
} from "./desktop.styles";

const AppIcon = ({ label, icon: Icon, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      style={getAppIconButtonStyles({ isHovered })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      aria-label={`Open ${label}`}
    >
      <span style={getAppIconGlyphStyles({ isHovered })}>{Icon ? <Icon size={18} strokeWidth={2.1} /> : null}</span>
      <p style={getAppIconLabelStyles()}>{label}</p>
    </button>
  );
};

export default AppIcon;

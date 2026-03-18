import { useState } from "react";
import { getButtonStyles } from "./button.styles";

const Button = ({
  label,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled && typeof onClick === "function") {
      onClick();
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={getButtonStyles({ variant, size, disabled, isHovered })}
    >
      {label}
    </button>
  );
};

export default Button;

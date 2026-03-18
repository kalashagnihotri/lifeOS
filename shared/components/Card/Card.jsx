import { useState } from "react";
import { getCardStyles } from "./card.styles";

const Card = ({ children, padding = "md", elevation = 0, scheme = "dark" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={getCardStyles({ padding, elevation, scheme, isHovered })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
};

export default Card;

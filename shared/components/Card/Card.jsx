import { getCardStyles } from "./card.styles";

const Card = ({ children, padding = "md", elevation = 0 }) => {
  return <div style={getCardStyles({ padding, elevation })}>{children}</div>;
};

export default Card;

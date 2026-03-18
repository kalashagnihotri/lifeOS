import { useState } from "react";
import Card from "../../../shared/components/Card/Card";
import {
  getInsightCardShellStyles,
  getInsightDescriptionStyles,
  getInsightTitleStyles,
  getInsightTypeStyles,
} from "./ai.styles";

const InsightCard = ({ title, description, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card padding="lg" elevation={2} scheme="dark">
      <div
        style={getInsightCardShellStyles({ type, isHovered })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p style={getInsightTypeStyles({ type })}>{type}</p>
        <h3 style={getInsightTitleStyles()}>{title}</h3>
        <p style={getInsightDescriptionStyles()}>{description}</p>
      </div>
    </Card>
  );
};

export default InsightCard;

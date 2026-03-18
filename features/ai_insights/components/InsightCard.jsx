import { useState } from "react";
import { CircleAlert, Lightbulb, Sparkles } from "lucide-react";
import Card from "../../../shared/components/Card/Card";
import {
  getInsightCardShellStyles,
  getInsightDescriptionStyles,
  getInsightIconStyles,
  getInsightTopRowStyles,
  getInsightTitleStyles,
  getInsightTypeBadgeStyles,
} from "./ai.styles";

const iconByType = {
  positive: Sparkles,
  warning: CircleAlert,
  suggestion: Lightbulb,
};

const InsightCard = ({ title, description, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const TypeIcon = iconByType[type] || Lightbulb;

  return (
    <Card padding="lg" elevation={2} scheme="dark">
      <div
        style={getInsightCardShellStyles({ type, isHovered })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={getInsightTopRowStyles()}>
          <p style={getInsightTypeBadgeStyles({ type })}>{type}</p>
          <TypeIcon size={16} strokeWidth={2.1} style={getInsightIconStyles({ type })} />
        </div>
        <h3 style={getInsightTitleStyles()}>{title}</h3>
        <p style={getInsightDescriptionStyles()}>{description}</p>
      </div>
    </Card>
  );
};

export default InsightCard;

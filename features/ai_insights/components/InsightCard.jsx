import Card from "../../../shared/components/Card/Card";
import {
  getInsightCardShellStyles,
  getInsightDescriptionStyles,
  getInsightTitleStyles,
  getInsightTypeStyles,
} from "./ai.styles";

const InsightCard = ({ title, description, type }) => {
  return (
    <Card padding="lg" elevation={1}>
      <div style={getInsightCardShellStyles({ type })}>
        <p style={getInsightTypeStyles({ type })}>{type}</p>
        <h3 style={getInsightTitleStyles()}>{title}</h3>
        <p style={getInsightDescriptionStyles()}>{description}</p>
      </div>
    </Card>
  );
};

export default InsightCard;

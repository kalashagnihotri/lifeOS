import Card from "../../../shared/components/Card/Card";
import {
  getStatCardContainerStyles,
  getStatCardTitleStyles,
  getStatCardValueStyles,
  getStatCardDescriptionStyles,
} from "./statCard.styles";

const StatCard = ({ title, value, description }) => {
  return (
    <Card padding="lg" elevation={1}>
      <div style={getStatCardContainerStyles()}>
        <p style={getStatCardTitleStyles()}>{title}</p>
        <p style={getStatCardValueStyles()}>{value}</p>
        {description ? <p style={getStatCardDescriptionStyles()}>{description}</p> : null}
      </div>
    </Card>
  );
};

export default StatCard;

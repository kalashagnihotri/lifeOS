import InsightCard from "./InsightCard";
import { getEmptyStateStyles, getInsightListStyles } from "./ai.styles";

const InsightList = ({ insights }) => {
  if (!insights.length) {
    return <p style={getEmptyStateStyles()}>No insights available yet.</p>;
  }

  return (
    <ul style={getInsightListStyles()}>
      {insights.map((insight) => (
        <li key={insight.id}>
          <InsightCard
            title={insight.title}
            description={insight.description}
            type={insight.type}
          />
        </li>
      ))}
    </ul>
  );
};

export default InsightList;

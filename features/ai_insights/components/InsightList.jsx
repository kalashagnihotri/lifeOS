import InsightCard from "./InsightCard";
import { getEmptyStateStyles, getInsightListStyles } from "./ai.styles";

const InsightList = ({ insights, isLoading = false }) => {
  if (isLoading) {
    return <p style={getEmptyStateStyles()}>Generating insights...</p>;
  }

  if (!insights.length) {
    return <p style={getEmptyStateStyles()}>No insights available yet.</p>;
  }

  return (
    <ul style={getInsightListStyles()}>
      {insights.map((insight, index) => (
        <li
          key={insight.id}
          style={{
            animation: `lifeosFadeSlideUp 360ms ease ${index * 70}ms both`,
          }}
        >
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

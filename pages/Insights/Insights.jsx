import MainLayout from "../../layouts/MainLayout/MainLayout";
import InsightList from "../../features/ai_insights/components/InsightList";
import useInsights from "../../features/ai_insights/hooks/useInsights";
import {
  getInsightsHeaderStyles,
  getInsightsPageStyles,
  getInsightsSubHeaderStyles,
} from "./insights.styles";

const Insights = () => {
  const { insights } = useInsights();

  return (
    <MainLayout>
      <section style={getInsightsPageStyles()}>
        <h1 style={getInsightsHeaderStyles()}>AI Insights</h1>
        <p style={getInsightsSubHeaderStyles()}>
          Pattern-driven recommendations generated from your recent productivity activity.
        </p>
        <InsightList insights={insights} />
      </section>
    </MainLayout>
  );
};

export default Insights;

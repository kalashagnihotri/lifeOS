import MainLayout from "../../layouts/MainLayout/MainLayout";
import InsightList from "../../features/ai_insights/components/InsightList";
import useInsights from "../../features/ai_insights/hooks/useInsights";
import {
  getInsightsHeaderStyles,
  getInsightsPageStyles,
  getInsightsSubHeaderStyles,
} from "./insights.styles";

const Insights = () => {
  const { insights, isLoading } = useInsights();

  return (
    <MainLayout>
      <section style={getInsightsPageStyles()}>
        <h1 style={getInsightsHeaderStyles()}>AI Insights</h1>
        <p style={getInsightsSubHeaderStyles()}>
          AI-generated recommendations based on your recent productivity activity.
        </p>
        <InsightList insights={insights} isLoading={isLoading} />
      </section>
    </MainLayout>
  );
};

export default Insights;

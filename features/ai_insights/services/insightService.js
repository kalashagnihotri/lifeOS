import {
  calculateTaskCompletionRate,
  calculateTotalFocusTime,
} from "../utils/insightUtils";
import { generateGeminiInsights } from "./geminiService";

const createInsight = (index, title, description, type) => ({
  id: `insight-${index}`,
  title,
  description,
  type,
});

export const generateRuleBasedInsights = ({ tasks, sessions, mood }) => {
  const insights = [];
  const completionRate = calculateTaskCompletionRate(tasks);
  const totalFocusMinutes = calculateTotalFocusTime(sessions);

  if (completionRate >= 70) {
    insights.push(
      createInsight(
        insights.length + 1,
        "Strong Task Execution",
        `You completed ${completionRate}% of your tasks. Your consistency is trending upward.`,
        "positive"
      )
    );
  } else {
    insights.push(
      createInsight(
        insights.length + 1,
        "Task Completion Opportunity",
        `Task completion is at ${completionRate}%. Try reducing daily task load for sharper focus.`,
        "warning"
      )
    );
  }

  if (totalFocusMinutes >= 150) {
    insights.push(
      createInsight(
        insights.length + 1,
        "Deep Work Momentum",
        `You logged ${totalFocusMinutes} focus minutes recently. Keep protecting your focus blocks.`,
        "positive"
      )
    );
  } else {
    insights.push(
      createInsight(
        insights.length + 1,
        "Focus Session Suggestion",
        `Only ${totalFocusMinutes} focus minutes logged. Schedule one extra 25-minute session today.`,
        "suggestion"
      )
    );
  }

  if (mood && typeof mood.score === "number") {
    if (mood.score >= 4) {
      insights.push(
        createInsight(
          insights.length + 1,
          "Mood Stability",
          `Recent mood trend is positive (${mood.label || "good"}). This usually supports better productivity.`,
          "positive"
        )
      );
    } else {
      insights.push(
        createInsight(
          insights.length + 1,
          "Energy Management Suggestion",
          `Mood trend appears ${mood.label || "mixed"}. Add lighter tasks during low-energy windows.`,
          "suggestion"
        )
      );
    }
  }

  insights.push(
    createInsight(
      insights.length + 1,
      "Next Step Recommendation",
      "Plan tomorrow with 3 priority tasks and 2 focus blocks for balance.",
      "suggestion"
    )
  );

  return insights.slice(0, 6);
};

export const generateInsights = async (payload) => {
  try {
    const aiInsights = await generateGeminiInsights(payload);

    if (aiInsights.length) {
      return aiInsights;
    }
  } catch {
    return generateRuleBasedInsights(payload);
  }

  return generateRuleBasedInsights(payload);
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL = "gemini-1.5-flash";
const ALLOWED_TYPES = new Set(["positive", "warning", "suggestion"]);

const toSafeArray = (value) => {
  return Array.isArray(value) ? value : [];
};

const summarizeTasks = (tasks) => {
  const normalizedTasks = toSafeArray(tasks);
  const completed = normalizedTasks.filter((task) => task.completed).length;
  const pending = normalizedTasks.length - completed;

  return {
    total: normalizedTasks.length,
    completed,
    pending,
  };
};

const summarizeFocusSessions = (sessions) => {
  const normalizedSessions = toSafeArray(sessions);
  const totalMinutes = normalizedSessions.reduce((total, session) => {
    return total + (Number(session.duration) || 0);
  }, 0);

  return {
    sessionCount: normalizedSessions.length,
    totalMinutes,
  };
};

const stripCodeFences = (text) => {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
};

const parseInsightJson = (text) => {
  const cleanedText = stripCodeFences(text);

  try {
    return JSON.parse(cleanedText);
  } catch {
    const arrayMatch = cleanedText.match(/\[[\s\S]*\]/);

    if (!arrayMatch) {
      return [];
    }

    try {
      return JSON.parse(arrayMatch[0]);
    } catch {
      return [];
    }
  }
};

const normalizeInsightType = (value) => {
  const normalizedType = String(value || "suggestion").toLowerCase();
  return ALLOWED_TYPES.has(normalizedType) ? normalizedType : "suggestion";
};

const normalizeInsights = (rawInsights) => {
  const normalizedList = Array.isArray(rawInsights) ? rawInsights : [];

  return normalizedList
    .map((insight, index) => {
      return {
        id: `insight-${index + 1}`,
        title: String(insight?.title || "Insight"),
        description: String(insight?.description || "No description provided."),
        type: normalizeInsightType(insight?.type),
      };
    })
    .filter((insight) => insight.title && insight.description)
    .slice(0, 5);
};

const createPrompt = ({ tasks, sessions, mood }) => {
  const taskSummary = summarizeTasks(tasks);
  const focusSummary = summarizeFocusSessions(sessions);
  const moodSummary = mood
    ? { label: mood.label || "unknown", score: Number(mood.score) || 0 }
    : { label: "not provided", score: null };

  return `You are a productivity assistant. Based on the following user data, generate 3-5 insights with actionable suggestions.

Tasks:
${JSON.stringify(taskSummary, null, 2)}

Focus sessions:
${JSON.stringify(focusSummary, null, 2)}

Mood:
${JSON.stringify(moodSummary, null, 2)}

Return response in JSON format only:
[
  { "title": "string", "description": "string", "type": "positive|warning|suggestion" }
]`;
};

export const generateGeminiInsights = async (payload) => {
  if (!GEMINI_API_KEY) {
    throw new Error("Missing Gemini API key");
  }

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
  const prompt = createPrompt(payload);
  const result = await model.generateContent(prompt);
  const responseText = result?.response?.text?.() || "";
  const parsedInsights = parseInsightJson(responseText);
  const normalizedInsights = normalizeInsights(parsedInsights);

  if (!normalizedInsights.length) {
    throw new Error("Gemini response did not contain valid insights");
  }

  return normalizedInsights;
};
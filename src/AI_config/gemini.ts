import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const makePrompt = async (prompt: string) => {
  const result = await model.generateContent(prompt);
  console.log(result);
  return result.response.text();
};

import "./env.js";
import OpenAI from "openai";

const ai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.GOOGLE_AI_BASE_URL || process.env.OPENAI_BASE_URL
});

export default ai;

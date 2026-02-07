import "dotenv/config";
import OpenAI from "openai";

const configs = [
    { model: "gemini-2.5-flash", url: process.env.GOOGLE_AI_BASE_URL },
];

async function testConfig(config) {
    console.log(`\nTesting Model: ${config.model}, Base URL: ${config.url}`);
    const ai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: config.url
    });

    try {
        const response = await ai.chat.completions.create({
            model: config.model,
            messages: [{ role: "user", content: "Hi" }],
        });
        console.log("SUCCESS!");
        return true;
    } catch (error) {
        console.log("FAILED:", error.status || error.message);
        if (error.status === 404) console.log("  -> 404 Not Found (Invalid URL or Model)");
        if (error.status === 400) console.log("  -> 400 Bad Request (Invalid Request Structure)");
        return false;
    }
}

async function run() {
    for (const config of configs) {
        if (await testConfig(config)) break;
    }
}

run();

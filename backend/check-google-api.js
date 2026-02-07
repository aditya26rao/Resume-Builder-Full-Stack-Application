import "dotenv/config";

const apiKey = process.env.OPENAI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Listing Available Models...`);

async function test() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok) {
            console.log("SUCCESS! Models found:");
            // Filter for generateContent supported models
            const models = data.models
                .filter(m => m.supportedGenerationMethods.includes("generateContent"))
                .map(m => m.name);
            console.log(models);
        } else {
            console.log("FAILED:", response.status, response.statusText);
            console.log("Error Body:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Network Error:", error);
    }
}

test();

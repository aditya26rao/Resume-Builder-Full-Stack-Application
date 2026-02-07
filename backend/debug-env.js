import "dotenv/config";
import fs from 'fs';

console.log("Current Directory:", process.cwd());
console.log("Content of .env file:");
try {
    const envContent = fs.readFileSync('.env', 'utf8');
    console.log(envContent);
} catch (e) {
    console.log("Could not read .env file:", e.message);
}

console.log("\nProcess Env OPENAI_BASE_URL:", process.env.OPENAI_BASE_URL);

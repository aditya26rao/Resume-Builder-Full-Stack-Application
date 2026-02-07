import ai from '../configs/ai.js'

// cleaned up syntax error
// Controller for enchancing a resume's professiona; summary

import Resume from "../models/Resume.js";

// POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "user",
                    content: `You are an expert in resume writing, Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also hightlighting key skills,experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.\n\nHere is the content: ${userContent}`
                },
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent })

    } catch (error) {
        console.error("AI Enhance Summary Error:", error);
        return res.status(500).json({ message: error.message || "AI enhancement failed" })
    }
}

// controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "user",
                    content: `You are an expert in resume writing, Your task is to enhance the Job description of a resume. The descrption should be 1-2 sentences also hightlighting key responsibiliteis and achievements, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.\n\nHere is the content: ${userContent}`
                },
            ],
        });
        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhancedContent })

    } catch (error) {
        console.error("AI Enhance Job Description Error:", error);
        return res.status(500).json({ message: error.message || "AI enhancement failed" })
    }
}


// controller for uploading a resume to the database
// POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body;
        const userId = req.userId;
        if (!resumeText) {
            return res.status(400).json({ message: 'Missing required fields' })
        }

        const systemPrompt = 'You are an expert AI Agent to extract data from resume.';
        const userPrompt = `extract data from this resume: ${resumeText}
        Provide data in the following JSON format with no additional text before or after:
        
    {
    professional_summary: { type: String, default: '' },
    skills: [{ type: String }],
    personal_info: {
        image: { type: String, default: '' },
        full_name: { type: String, default: '' },
        profession: { type: String, default: '' },
        email: { type: String, default: '' },
        phone: { type: String, default: '' },
        location: { type: String, default: '' },
        linkedin: { type: String, default: '' },
        website: { type: String, default: '' },
    },
    experience: [
        {
            company: { type: String },
            position: { type: String },
            start_date: { type: String },
            end_date: { type: String },
            description: { type: String },
            is_current: { type: String },
        }
    ],
    projects: [
        {
            name: { type: String },
            type: { type: String },
            description: { type: String },
        }
    ],
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            gpa: { type: String },
        }
    ],
    }
        `;

        // Combined prompt for better compatibility
        const messages = [
            {
                role: "user",
                content: `${systemPrompt}\n\n${userPrompt}`
            }
        ];

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: messages,
        });

        let extractedData = response.choices[0].message.content;

        // Sanitize extracted data if it contains markdown code blocks
        if (extractedData.startsWith('```json')) {
            extractedData = extractedData.replace(/^```json/, '').replace(/```$/, '');
        } else if (extractedData.startsWith('```')) {
            extractedData = extractedData.replace(/^```/, '').replace(/```$/, '');
        }

        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({ userId, title, ...parsedData })

        res.json({ resumeId: newResume._id })

    } catch (error) {
        console.error("Error in uploadResume:", error);
        return res.status(400).json({ message: error.message })
    }
}

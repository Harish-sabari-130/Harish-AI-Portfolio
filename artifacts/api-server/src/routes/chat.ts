import { Router, type IRouter } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SendChatMessageBody, SendChatMessageResponse } from "@workspace/api-zod";
import fs from "node:fs";
import path from "node:path";
import { logger } from "../lib/logger";

const router: IRouter = Router();

// Load the resume information to use as context for Saha
let resumeText = "";
try {
  const possiblePaths = [
    path.resolve(process.cwd(), "attached_assets", "Pasted-Harish-Sabari-P-V-AI-Machine-Learning-Student-Full-Stac_1781191619902.txt"),
    path.resolve(process.cwd(), "..", "..", "attached_assets", "Pasted-Harish-Sabari-P-V-AI-Machine-Learning-Student-Full-Stac_1781191619902.txt"),
    path.resolve(__dirname, "..", "..", "..", "attached_assets", "Pasted-Harish-Sabari-P-V-AI-Machine-Learning-Student-Full-Stac_1781191619902.txt"),
    path.resolve(__dirname, "..", "..", "attached_assets", "Pasted-Harish-Sabari-P-V-AI-Machine-Learning-Student-Full-Stac_1781191619902.txt"),
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      resumeText = fs.readFileSync(p, "utf-8");
      logger.info({ path: p }, "Loaded resume context successfully");
      break;
    }
  }
} catch (e) {
  logger.error({ err: e }, "Failed to read resume file");
}

const SYSTEM_PROMPT = `
You are "Saha", an AI companion built into Harish Sabari P V's professional portfolio website.
Your purpose is to answer visitor questions regarding Harish Sabari's skills, education, projects, experience, certifications, and background.

Here are the details about Harish Sabari P V:
${resumeText}

Instructions for your responses:
1. Speak in the first person representing "Saha", the portfolio assistant.
2. Be helpful, professional, friendly, and concise. Keep answers conversational.
3. If asked about contact information or hiring, provide his email (harish23alr@gmail.com) and mention his LinkedIn and GitHub links.
4. Only answer based on the facts provided in the resume/portfolio details above. If you don't know or if the info is not in the context, politely state that you can't find that detail but encourage them to contact Harish directly.
5. Do not make up any certifications, projects, or grades.
`;

router.post("/chat", async (req, res, next) => {
  try {
    // Validate request body
    const body = SendChatMessageBody.parse(req.body);
    const { message, history } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      logger.warn("GEMINI_API_KEY environment variable is not set. Falling back to mock client-side response mode.");
      const mockReply = `Hello! I am Saha. Note that the GEMINI_API_KEY environment variable is not set on the server, so I am running in preview mode. 

Harish Sabari P V is a B.Tech AIML student at Kongu Engineering College. He has built Safina (Women Safety), Live Vision (YOLO Object Detection), Nomad Visa Hub, and an AI Expense Tracker. You can reach him at harish23alr@gmail.com.

You asked: "${message}"`;
      res.json(SendChatMessageResponse.parse({ response: mockReply }));
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Map history to the format expected by the Gemini API
    const formattedHistory = (history || []).map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));

    // Gemini requires the first message in the history to be from the 'user' role.
    // If the history starts with a 'model' message (such as the initial greeting), remove it.
    while (formattedHistory.length > 0 && formattedHistory[0].role === "model") {
      formattedHistory.shift();
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    res.json(SendChatMessageResponse.parse({ response: responseText }));
  } catch (error) {
    logger.error({ err: error }, "Error in chat router handler");
    next(error);
  }
});

export default router;

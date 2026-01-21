
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateEmailContent = async (studentName: string, phase: string, nextPhase: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a professional congratulatory email in Chinese for a student named ${studentName} who just passed their ${phase} stage. Mention that they should now prepare for the ${nextPhase} stage. Keep it encouraging and formal. Output ONLY the email body.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "恭喜你顺利通过本阶段！请继续努力准备下一阶段工作。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "恭喜你顺利通过本阶段审核。请关注后续系统通知并准备下一阶段材料。";
  }
};

export const analyzeStatus = async (students: any[]) => {
  // Simple AI insight generation based on student statuses
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on this student data: ${JSON.stringify(students.map(s => ({ name: s.name, status: s.status, phase: s.currentPhase })))}. Provide 3 brief, actionable insights in Chinese for the administrator.`,
      config: {
        temperature: 0.5,
      }
    });
    return response.text || "暂无重要洞察。";
  } catch (error) {
    return "系统运行正常。请关注处于'导师审核中'超过2天的学生。";
  }
};

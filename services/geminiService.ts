
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateChallengeDescription = async (challengeTitle: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve(`This is a mock description for "${challengeTitle}". The real description requires a Gemini API key. It's a super fun challenge where you have to be really creative!`);
  }
  
  try {
    const prompt = `Generate a fun, short, and exciting description for a karaoke app challenge called '${challengeTitle}'. Explain the rules in one simple sentence. The tone should be encouraging and playful. Maximum 40 words.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text || "Tantangan seru menanti!";
  } catch (error) {
    console.error("Error generating challenge description:", error);
    return "Could not generate a description at this time. But it's sure to be a fun challenge!";
  }
};

export const generateChatReply = async (userMessage: string, friendName: string): Promise<string> => {
    // Fallback replies if API is missing or fails
    const fallbacks = [
        "Wah seru juga ya!",
        "Haha, bener banget tuh.",
        "Eh, gimana kalau kita duet nanti?",
        "Lagi sibuk nyanyi nih, bentar ya!",
        "Mantap! Semangat terus kawan.",
        "Waduh, aku kurang tau kalau itu."
    ];

    if (!API_KEY) {
        return Promise.resolve(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
    }

    try {
        const prompt = `
            Bertindaklah sebagai ${friendName}, seorang teman pengguna di aplikasi Karaoke bernama "Daily Song Challenge".
            Temanmu baru saja mengirim pesan ini: "${userMessage}".
            
            Berikan balasan yang:
            1. Relevan dengan pertanyaan atau pernyataan mereka.
            2. Gunakan bahasa Indonesia yang santai, gaul, dan akrab (seperti chat WhatsApp antar teman).
            3. Singkat (maksimal 2 kalimat).
            4. Terkadang ajak mereka untuk bernyanyi atau bahas soal lagu/skor jika relevan.
            
            Balasan:
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || fallbacks[Math.floor(Math.random() * fallbacks.length)];
    } catch (error) {
        console.error("Error generating chat reply:", error);
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
};

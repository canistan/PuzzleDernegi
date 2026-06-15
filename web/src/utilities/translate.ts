import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const translateJSON = async (
  data: any,
  targetLangCode: string
): Promise<any> => {
  if (!genAI) {
    console.warn('GEMINI_API_KEY is not set. Skipping translation.');
    return data;
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Map language codes to names for the prompt
  const langMap: Record<string, string> = {
    en: 'English',
    de: 'German',
    fr: 'French',
    ru: 'Russian',
  };
  const targetLanguage = langMap[targetLangCode] || targetLangCode;

  const prompt = `
You are a professional translator. You will receive a JSON object representing CMS content for a website.
Your task is to translate ALL human-readable string values from Turkish to ${targetLanguage}.

CRITICAL RULES:
1. ONLY translate string values. Do NOT translate keys/property names.
2. DO NOT translate strings that are clearly URLs, internal IDs, image filenames, or enum/system values (e.g., 'blockType', 'hero', 'details', 'image', 'winners', 'tr', 'en').
3. Keep the exact JSON structure intact (including all nested objects and arrays).
4. Return ONLY valid JSON, with no markdown formatting like \`\`\`json.
5. If a string is empty or null, leave it as is.
6. The output must be parseable by JSON.parse().

JSON to translate:
${JSON.stringify(data)}
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const responseText = result.response.text();
    const translatedData = JSON.parse(responseText);
    return translatedData;
  } catch (error) {
    console.error(`Gemini Translation Error for ${targetLangCode}:`, error);
    return data; // Fallback to original data if translation fails
  }
};

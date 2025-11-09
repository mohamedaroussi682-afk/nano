
import { GoogleGenAI, Modality } from "@google/genai";

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const editImageWithGemini = async (imageFile: File, prompt: string): Promise<{imageUrl: string | null, text: string | null}> => {
  const API_KEY = "AIzaSyDHjMQ70HFrd1C2inQPfI-lpHksgHXUSM0";
  if (!API_KEY) {
    throw new Error("API_KEY is not defined.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const imagePart = await fileToGenerativePart(imageFile);
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let imageUrl: string | null = null;
  let text: string | null = null;

  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      } else if (part.text) {
        text = part.text;
      }
    }
  }

  if (!imageUrl) {
      throw new Error("API did not return an image. It might have refused the request.");
  }
  
  return { imageUrl, text };
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  const productContext = PRODUCTS.map(p => 
    `- ${p.name} (KES ${p.price}): ${p.description}. Features: ${p.features.join(', ')}`
  ).join('\n');

  return `You are the AI Concierge for "Mell Bags", a premium Kenyan leather brand. 
  Your tone is sophisticated, warm, and deeply connected to Nairobi's craftsmanship. 
  Prefer words like "heritage", "hand-stitched", "Kenyan leather", and "craftsmanship".
  
  Here is our current product catalog:
  ${productContext}
  
  Answer customer questions about specifications, recommendations, and our brand philosophy of blending traditional craftsmanship with modern elegance.
  Keep answers concise (under 3 sentences usually) to fit the chat UI. 
  If asked about products not in the list, gently steer them back to Mell Bags products.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    let apiKey: string | undefined;
    
    // Robustly attempt to get the API key, handling ReferenceError if process is not defined
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      // process is likely not defined in this environment
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the server right now. (Missing API Key)";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
  }
};
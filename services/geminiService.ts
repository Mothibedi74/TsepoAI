import { GoogleGenAI } from '@google/genai';
import type { Product } from '../types';

function getAiInstance() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

type GeneratedProductDetails = Omit<Product, 'id' | 'imageUrl'> & { imageQuery: string };

export async function generateProductDetails(productIdea: string): Promise<GeneratedProductDetails> {
  try {
    const ai = getAiInstance();
    const prompt = `You are a marketing expert for a no-code product showcase. A user has provided a product idea: "${productIdea}".
    Your task is to generate a compelling product listing based on this idea.

    Generate the following details:
    1. 'name': Create a catchy, professional name for the product.
    2. 'description': Write a concise, compelling summary (max 2-3 sentences).
    3. 'price': Suggest a realistic price. If it's a one-time purchase, make it between 99 and 499. If it's a subscription, make it between 19 and 79.
    4. 'priceType': Decide if the price should be a one-time 'LTD' (Lifetime Deal) or a recurring 'Subscription'.
    5. 'purchaseUrl': Create a plausible placeholder PayPal URL like 'https://paypal.me/tsepomotsatse/PRICE' where PRICE is the price you generated.
    6. 'imageQuery': Provide a short, descriptive phrase for a stock photo that would visually represent this product (e.g., "modern dashboard analytics", "person designing website on laptop").

    Respond ONLY with a valid JSON object. Do not include markdown fences like \`\`\`json or any other text outside of the JSON object itself. The JSON object must strictly conform to this structure:
    {
      "name": "string",
      "description": "string",
      "price": number,
      "priceType": "'LTD' or 'Subscription'",
      "purchaseUrl": "string",
      "imageQuery": "string"
    }`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    const productData = JSON.parse(response.text.trim());
    
    if (!productData.name || !productData.priceType || !productData.imageQuery) {
        throw new Error("AI response was not in the expected format.");
    }

    return productData;

  } catch (error) {
    console.error("Error generating product details from Gemini:", error);
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('connect'))) {
      throw new Error("A network error occurred. Could not connect to the AI service. Please try again.");
    }
    throw new Error("Failed to generate product details. The AI could not process the request.");
  }
}
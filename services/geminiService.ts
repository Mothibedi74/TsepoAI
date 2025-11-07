import { GoogleGenAI, Type, Modality } from '@google/genai';
import type { Product } from '../types';

function getAiInstance() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set.");
    }
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
}

type GeneratedProductDetails = Omit<Product, 'id'>;

export async function generateProductDetails(productIdea: string): Promise<GeneratedProductDetails> {
  try {
    const ai = getAiInstance();
    const textPrompt = `You are a marketing expert for a no-code product showcase. A user has provided a product idea: "${productIdea}".
    Your task is to generate a compelling product listing based on this idea.
    
    Please provide:
    - A catchy, professional name.
    - A concise, compelling summary (2-3 sentences).
    - A realistic price (99-499 for one-time, 19-79 for subscription).
    - The price type: 'LTD' (Lifetime Deal) or 'Subscription'.
    - A placeholder PayPal URL.
    - A short phrase for a representative stock photo.`;

    const textResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: textPrompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: {
              type: Type.STRING,
              description: 'A catchy, professional name for the product.',
            },
            description: {
              type: Type.STRING,
              description: 'A concise, compelling summary (max 2-3 sentences).',
            },
            price: {
              type: Type.NUMBER,
              description:
                "A realistic price. If it's a one-time purchase, make it between 99 and 499. If it's a subscription, make it between 19 and 79.",
            },
            priceType: {
              type: Type.STRING,
              description: "Must be either 'LTD' (for Lifetime Deal) or 'Subscription'.",
            },
            purchaseUrl: {
              type: Type.STRING,
              description:
                "A plausible placeholder PayPal URL like 'https://paypal.me/motsatsetsepo66/PRICE' where PRICE is the price generated.",
            },
            imageQuery: {
              type: Type.STRING,
              description:
                'A short, descriptive phrase for a stock photo that would visually represent this product (e.g., "modern dashboard analytics").',
            },
          },
          required: ['name', 'description', 'price', 'priceType', 'purchaseUrl', 'imageQuery'],
        },
      },
    });
    
    const productTextData = JSON.parse(textResponse.text.trim());
    
    if (
      !productTextData.name ||
      !productTextData.description ||
      !productTextData.price ||
      !productTextData.priceType ||
      !productTextData.purchaseUrl ||
      !productTextData.imageQuery ||
      (productTextData.priceType !== 'LTD' && productTextData.priceType !== 'Subscription')
    ) {
        throw new Error("AI response for product details was not in the expected format.");
    }

    // Step 2: Generate an image based on the text prompt
    const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: `A professional, clean, and modern product image for a website showcase. The product is related to: ${productTextData.imageQuery}. Studio lighting, minimalist background.` }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    let imageUrl = '';
    const firstCandidate = imageResponse.candidates?.[0];
    if (firstCandidate?.content?.parts) {
        for (const part of firstCandidate.content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                imageUrl = `data:image/png;base64,${base64ImageBytes}`;
                break; 
            }
        }
    }

    if (!imageUrl) {
        throw new Error("AI failed to generate an image.");
    }
    
    const { imageQuery, ...restOfProductData } = productTextData;

    return {
        ...restOfProductData,
        imageUrl,
    };

  } catch (error) {
    console.error("Error generating product details from Gemini:", error);
    if (error instanceof Error && (error.message.includes('fetch') || error.message.includes('connect'))) {
      throw new Error("A network error occurred. Could not connect to the AI service. Please try again.");
    }
    if (error instanceof SyntaxError) {
        throw new Error("Failed to parse AI response. The format was unexpected.");
    }
    throw new Error("Failed to generate product details. The AI could not process the request.");
  }
}

import OpenAI from 'openai';
import { readInstructions } from '../utils/fileUtils';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

let cachedInstructions: string | null = null;

async function getInstructions(): Promise<string> {
  if (!cachedInstructions) {
    try {
      const response = await fetch('/src/config/gpt-instructions.txt');
      if (!response.ok) throw new Error('Failed to load instructions');
      cachedInstructions = await response.text();
    } catch (error) {
      console.error('Error loading instructions:', error);
      cachedInstructions = "You are a helpful AI assistant. Please provide clear, concise, and accurate responses.";
    }
  }
  return cachedInstructions;
}

export async function getAIResponse(message: string): Promise<string> {
  try {
    const response = await fetch('http://194.87.44.115:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: await getInstructions() },
          { role: "user", content: message }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.content;
  } catch (error: any) {
    console.error('API Error:', error.message);
    throw new Error(error.message || 'Failed to get AI response');
  }
}

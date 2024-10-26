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
    const instructions = await getInstructions();
    
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: instructions },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    return response;
  } catch (error: any) {
    console.error('OpenAI API Error:', error.message);
    throw new Error(error.message || 'Failed to get AI response');
  }
}
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function getAIResponse(message: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { 
          role: "system", 
          content: "You are a friendly bar chatbot that helps customers with information about Welcome Bar. Be concise and friendly in your responses."
        },
        { role: "user", content: message }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response received from AI');
    }

    return response;
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return "Извините, произошла ошибка. Пожалуйста, позвоните нам по телефону +7 923 344 5090 или напишите в WhatsApp для получения информации.";
  }
}
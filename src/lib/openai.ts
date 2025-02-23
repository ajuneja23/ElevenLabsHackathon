interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function analyzeSentiment(question: string) {
  const prompt = `Conduct a sentiment analysis by searching social media regarding the following question: "${question}"

Please format your response using markdown, including:
- Bold text for key points using **bold**
- Bullet points for lists
- Headers where appropriate using #
- Any other markdown formatting that would enhance readability make it visually really fancy and appealing

Structure your analysis with these sections:
1. Positive Sentiment
2. Negative Sentiment
3. Neutral Sentiment
this is the code that renders this fit your markdown format with this `

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
} 
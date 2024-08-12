import axios from "axios";
const apiKey = process.env.OPENAI_API_KEY;
import { OpenAIResponse } from "./types";

if (!apiKey) {
  throw new Error(
    "The OPENAI_API_KEY environment variable is missing or empty.",
  );
}

// export async function fetchLLMResponse(query: string): Promise<string> {
//     try {
//         const response = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo', // Use the chat model
//             messages: [{ role: 'user', content: query }],
//             max_tokens: 100,
//         });
//         return response.choices[0]?.message?.content || 'No response';
//     } catch (error) {
//         console.error('Error fetching LLM response:', error);
//         throw error;
//     }
// }

const openaiBaseUrl = "https://api.openai.com/v1/chat/completions";

export async function fetchLLMResponse(query: string): Promise<string> {
  try {
    const response = await axios.post<OpenAIResponse>(
      openaiBaseUrl,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0]?.message?.content || "No response";
  } catch (error) {
    console.error("Error fetching LLM response:", error);
    throw error;
  }
}

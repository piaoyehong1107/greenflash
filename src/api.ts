import dotenv from 'dotenv';
import axios from 'axios';
import { OpenAIResponse } from './types';
import Replicate from 'replicate';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_TOKEN;
const openaiModelName = process.env.OPENAI_MODEL_NAME;
const replicateModelName = process.env.REPLICATE_MODEL_NAME as `${string}/${string}` | `${string}/${string}:${string}`;

if (!openaiApiKey) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty.');
}

if (!replicateApiKey) {
  throw new Error('The REPLICATE_API_TOKEN environment variable is missing or empty.');
}

const openaiBaseUrl = 'https://api.openai.com/v1/chat/completions';

const replicate = new Replicate({
  auth: replicateApiKey,
});

export async function fetchOpenaiResponse(systemPrompt: string, fullPrompt: string): Promise<string> {
  console.log(fullPrompt)   
  try {
    const response = await axios.post<OpenAIResponse>(
      openaiBaseUrl,
      {
        model: openaiModelName,
        messages: [
          { role: "system", content: systemPrompt },
          { role: 'user', content: fullPrompt }
        ],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Error fetching LLM response:', error);
    throw error;
  }
}

export async function fetchReplicateResponse(systemPrompt: string, fullPrompt: string): Promise<string> {
console.log(fullPrompt)

  const input = {
    top_p: 0.9,
    prompt: fullPrompt,
    min_tokens: 0,
    temperature: 0.6,
    prompt_template: `<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n${systemPrompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n`,
    presence_penalty: 1.15
};

  let result = '';

  try {
    for await (const event of replicate.stream(replicateModelName, { input })) {
      const eventString = event.toString();
      result += eventString;
    }

    return result;
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    throw new Error('Failed to stream response from Replicate API');
  }
}
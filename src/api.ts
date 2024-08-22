import dotenv from 'dotenv';
import axios from 'axios';
import { OpenAIResponse } from './types';
import Replicate from 'replicate';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_TOKEN;
const openaiModelName = process.env.OPENAI_MODEL_NAME ;
const replicatelModelName= process.env.REPLICATE_MODEL_NAME;

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

export async function fetchOpenaiResponse(query: string): Promise<string> {
  try {
    const response = await axios.post<OpenAIResponse>(
      openaiBaseUrl,
      {
        model: openaiModelName,
        messages: [{ role: 'user', content: query }],
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

export async function fetchReplicateResponse(query: string): Promise<string> {
  const input = {
    top_k: 50,
     top_p: 0.9,
     prompt: query,
     temperature: 0.6,
     system_prompt: "You are a very helpful, respectful and honest assistant.",
     length_penalty: 1,
     max_new_tokens: 512,
     prompt_template: "<s>[INST] {prompt} [/INST] ",
     presence_penalty: 0,
  };

  let result = '';  

  try {
    for await (const event of replicate.stream(replicatelModelName as `${string}/${string}` | `${string}/${string}:${string}` , { input })) {
      const eventString = event.toString();
      process.stdout.write(eventString);
      result += eventString;
    }

    return result;

  } catch (error) {
    console.error('Error calling Replicate API:', error);
    throw new Error('Failed to stream response from Replicate API');
  }
}
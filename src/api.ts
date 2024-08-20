import dotenv from 'dotenv';
import axios from 'axios';
import { OpenAIResponse, ReplicateResponse } from './types';
import { askForRating } from './user'
import Replicate from 'replicate';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_TOKEN;

if (!apiKey) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty.');
}

if (!replicateApiKey) {
  throw new Error('The REPLICATE_API_TOKEN environment variable is missing or empty.');
}

const openaiBaseUrl = 'https://api.openai.com/v1/chat/completions';
const replicateBaseUrl = 'https://api.replicate.com/v1/predictions';

function handleExit() {
  askForRating();
}

process.on('SIGINT', () => {
  console.log('\nExiting...');
  handleExit();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('\nTerminating...');
  handleExit();
  process.exit();
});

const replicate = new Replicate({
  auth: replicateApiKey,
});

export async function fetchLLMResponse(query: string): Promise<string> {
  try {
    const response = await axios.post<OpenAIResponse>(
      openaiBaseUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: query }],
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
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
    length_penalty: 1,
    max_new_tokens: 512,
    prompt_template: "<s>[INST] {prompt} [/INST] ",
    presence_penalty: 0,
  };

  let result = '';  

  try {
    for await (const event of replicate.stream("meta/meta-llama-3-8b", { input })) {
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
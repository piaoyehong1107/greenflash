import dotenv from 'dotenv';
import axios from 'axios';
import { OpenAIResponse, ReplicateResponse } from './types';
import { askForRating } from './user'

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
  // Call askForRating to prompt the user before exit
  askForRating();
}

// Register exit event handlers
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
  try {
    const response = await axios.post<ReplicateResponse>(
      replicateBaseUrl,
      {
        version: 'mistralai/mistral-7b-instruct-v0.2:f5701ad8',
        input: {
          prompt: query,
          max_tokens: 1024
        }
      },
      {
        headers: {
          Authorization: `Token ${replicateApiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data.choices[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    throw new Error('Failed to get response from Replicate API');
  }
}


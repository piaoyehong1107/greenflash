import dotenv from 'dotenv';
dotenv.config();

import axios from "axios";
import { OpenAIResponse, ReplicateResponse } from "./types";
const apiKey = process.env.OPENAI_API_KEY;
const replicateApiKey = process.env.REPLICATE_API_TOKEN;

if (!apiKey) {
    throw new Error(
      "The OPENAI_API_KEY environment variable is missing or empty.",
    );
  }

if (!replicateApiKey) {
    throw new Error(
        'The REPLICATE_API_KEY environment variable is missing or empty.'
    );
}

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

const replicateBaseUrl = 'https://api.replicate.com/v1/predictions';

export async function fetchReplicateResponse(query: string): Promise<string> {
  try {
    const response = await axios.post<ReplicateResponse>(
      replicateBaseUrl,
      {
        version: 'mistralai/mistral-7b-instruct-v0.2:f5701ad8',
        input: {
          text: query,
        },
      },
      {
        headers: {
          'Authorization': `Token ${replicateApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data?.predictions[0]?.content || "No response";
  } catch (error) {
    console.error('Error calling Replicate API:', error);
    throw new Error('Failed to get response from Replicate API');
  }
}



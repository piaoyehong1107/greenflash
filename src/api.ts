import * as dotenv from 'dotenv';
dotenv.config();

import axios from "axios";
const apiKey = process.env.OPENAI_API_KEY;
const replicateApiKey = process.env.REPLICATE_APT_TOKEN;
import { OpenAIResponse } from "./types";
import { ReplicateResponse } from './types';

if (!apiKey) {
    throw new Error(
      "The OPENAI_API_KEY environment variable is missing or empty.",
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

if (!replicateApiKey) {
    throw new Error('The REPLICATE_API_KEY environment variable is missing or empty.');
}

const replicateBaseUrl = "https://api.replicate.com/v1/predictions";

export async function fetchReplicateResponse(query: string): Promise<string> {
    try {
        const response = await axios.post<ReplicateResponse>(
            replicateBaseUrl,
            {
                version: 'xqimjrdbqat35q43ivzclgrzlu', // Replace with the specific version of the model you're using
                input: { prompt: query },
            },
            {
                headers: {
                    'Authorization': `Token ${replicateApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data.output || 'No response';
    } catch (error) {
        console.error('Error fetching Replicate response:', error);
        throw error;
    }
}
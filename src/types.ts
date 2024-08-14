export interface OpenAIChoice {
  message: {
    content: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export interface ReplicateResponse {
  id: string;
  output: string;
  status: string;
  // Add other properties as needed based on the API response
}
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
  predictions: Array<{
    content: string;
  }>
}
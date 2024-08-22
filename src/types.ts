export interface OpenAIChoice {
  message: {
    content: string;
  };
}

export interface OpenAIResponse {
  choices: OpenAIChoice[];
}

export interface ReplicateAIChoice {
  message: {
    content: string;
  };
}

export interface ReplicateResponse {
  choices: ReplicateAIChoice[];
}
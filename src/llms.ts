export type LLM = {
  name: string;
};

export const llms: LLM[] = [
  { name: "GPT-4" },
  { name: "Replicate" },
];

export const llmNames = llms.map((llm) => llm.name);
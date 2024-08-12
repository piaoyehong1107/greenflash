type LLM = {
  name: string;
  apiKey: string;
};

const llms: LLM[] = [
  { name: "GPT-4", apiKey: "MY_API_KEY" },
  { name: "Claude", apiKey: "MY_API_KEY" },
  { name: "Llama3", apiKey: "MY_API_KEY" },
];
const llmNames = llms.map((llm) => llm.name);

export { llms, llmNames };

type LLM = {
  name: string;
};

const llms: LLM[] = [
  { name: "GPT-4"},
  { name: "Claude"},
  { name: "Llama3"},
];
const llmNames = llms.map((llm) => llm.name);

export {llmNames};

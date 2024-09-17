type LLM = {
  name: string;
};

const llms: LLM[] = [
  { name: "GPT-4"},
  { name: "Llama3"},
  { name: "Reflection"}
];
const llmNames = llms.map((llm) => llm.name);

export { llmNames, llms };
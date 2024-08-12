import * as readlineSync from "readline-sync";
import { llmNames, llms } from "./llms";

// export function startChat(): void {
//     const index = readlineSync.keyInSelect(llmNames, "Which LLM?");
//     if (index === -1) {
//         console.log('No model selected, exiting.');
//     } else {
//         console.log(`You started chat with ${llmNames[index]}`);
//     }
// }

import { fetchLLMResponse } from "./api";

export async function startChat(): Promise<void> {
  const index = readlineSync.keyInSelect(llmNames, "Which LLM?");
  if (index === -1) {
    console.log("No model selected, exiting.");
    return;
  }

  console.log(`You started chat with ${llmNames[index]}`);
  const query = readlineSync.question("Enter your query: ");

  try {
    const response = await fetchLLMResponse(query);
    console.log("Response from LLM:", response);
  } catch (error) {
    console.error("Failed to fetch response from LLM.");
  }
}

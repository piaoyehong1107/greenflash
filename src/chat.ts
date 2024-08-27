import * as readlineSync from 'readline-sync';
import { llmNames, llms } from './llms';
import { fetchOpenaiResponse, fetchReplicateResponse } from './api';
import { askForRating } from './user';

export async function askForModelChoice(): Promise<string> {

  console.log('Please choose a model:');
  llmNames.forEach((model, index) => {
    console.log(`${index + 1}. ${model}`);
  });

  const choiceIndex = readlineSync.questionInt('Enter the number corresponding to your model choice: ') - 1;

  if (choiceIndex < 0 || choiceIndex >= llmNames.length) {
    console.log('Invalid choice. Please try again.');
    return askForModelChoice();
  }

  return llmNames[choiceIndex];
}

export async function startChat(modelName?: string): Promise<void> {
 //if model namedl not in llmNames do again
 
  if (!modelName) {
    console.log('No model name provided and no default model selected.');
    return;
  }

  const selectedLLM = llms.find(llm => llm.name.toLowerCase() === modelName.toLowerCase());

  let llm;

  if (selectedLLM) {
    llm = selectedLLM.name;
  } else {
    const index = readlineSync.keyInSelect(llmNames, 'Which LLM?');
    if (index === -1) {
      console.log('No LLM selected, exiting.');
      return;
    }
    llm = llmNames[index];
  }

  let query: string;
  do {
    query = readlineSync.question('Enter your query (type "exit" to quit): ');

    if (query.toLowerCase() === 'exit') {
      console.log('Exiting the chat. Goodbye!');
      break;
    }

    try {
      let response: string;

      if (llm === 'Replicate') {
        response = await fetchReplicateResponse(query);
        console.log('Response from Replicate:', response);
      } else {
        response = await fetchOpenaiResponse(query);
        console.log('Response from GPT-4:', response);
      }
    } catch (error) {
      console.error(`Failed to fetch response from ${llm}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
}
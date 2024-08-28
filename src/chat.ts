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

export async function startChat(modelName: string): Promise<void> {

  const selectedLLM = llms.find(llm => llm.name.toLowerCase() === modelName.toLowerCase());

  if (!selectedLLM) {
    console.log(`Invalid model: ${modelName}. Please choose a valid model.`);
    modelName = await askForModelChoice();
  }

  console.log(`Starting chat with model: ${modelName}`);

  let query: string;
  do {
    query = readlineSync.question('Enter your query (type "exit" to quit): ');

    if (query.toLowerCase() === 'exit') {
      console.log('Exiting the chat. Goodbye!');
      break;
    }

    try {
      let response: string;

      if (modelName === 'Replicate') {
        response = await fetchReplicateResponse(query);
        console.log('Response from Replicate:', response);
      } else {
        response = await fetchOpenaiResponse(query);
        console.log('Response from GPT-4:', response);
      }
    } catch (error) {
      console.error(`Failed to fetch response from ${modelName}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
}
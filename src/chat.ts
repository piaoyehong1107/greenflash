import * as readlineSync from 'readline-sync';
import { llmNames } from './llms';
import { fetchLLMResponse, fetchReplicateResponse } from './api';
import { askForRating } from './user';

export async function startChat(): Promise<void> {
  const index = readlineSync.keyInSelect(llmNames, 'Which LLM?');
  if (index === -1) {
    console.log('No model selected, exiting.');
    return;
  }

  console.log(`You started chat with ${llmNames[index]}`);

  let query: string;
  do {
    query = readlineSync.question('Enter your query (type "exit" to quit): ');

    if (query.toLowerCase() === 'exit') {
      console.log('Exiting the chat. Goodbye!');
      break;
    }

    try {
      let response: string;

      if (llmNames[index] === 'Replicate') {
        response = await fetchReplicateResponse(query);  // Now returns a string
        console.log('Response from Replicate:', response);
      } else {
        response = await fetchLLMResponse(query);
        console.log('Response from GPT-4:', response);
      }
    } catch (error) {
      console.error(`Failed to fetch response from ${llmNames[index]}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
}


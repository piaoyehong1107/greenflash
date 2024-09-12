import * as readlineSync from 'readline-sync';
import { llmNames} from './llms';
import { fetchOpenaiResponse, fetchReplicateResponse } from './api';
import { askForRating, askForConversion } from './conversion';

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

  console.log(`Starting chat with model: ${modelName}`);

  let query: string;
  let systemPrompt: string
  let conversationHistory: string[] = [];

 systemPrompt = readlineSync.question("Would you like to provide a system systemPrompt?(Default No)", {
    defaultInput: 'No'
  })
  if (systemPrompt.toLowerCase() ==='no'){

    systemPrompt = "You are a very helpful, respectful and honest assistant."
    console.log(`No system systemPrompt provided. Continuing with the default systemPrompt: ${systemPrompt}`)
  } else{
    console.log("System systemPrompt provided:", systemPrompt)
    conversationHistory.push(`System: ${systemPrompt}`)
  }

  do {
    query = readlineSync.question('Enter your query (type "exit" to quit): ');
    if (query.toLowerCase() === 'exit') {
      console.log('Exiting the chat. Goodbye!');
      break;
    }
    conversationHistory.push(`You: ${query}`);

    try {
      let response: string;
      const fullPrompt = `${conversationHistory.join('\n')}`
      console.log(fullPrompt)


      if (modelName.toLowerCase() === 'replicate') {
        response = await fetchReplicateResponse(systemPrompt, fullPrompt);
        console.log('Response from Replicate:', response);
      } else {
        response = await fetchOpenaiResponse(systemPrompt, fullPrompt);
        console.log('Response from GPT-4:', response);
      }

      conversationHistory.push(`${modelName}: ${response}`)

    } catch (error) {
      console.error(`Failed to fetch response from ${modelName}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
  askForConversion();
}
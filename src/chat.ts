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
      const fullPrompt = `${systemPrompt}\n${conversationHistory.join('\n')}`
      // console.log(fullPrompt)

      if (modelName === 'Replicate') {
        response = await fetchReplicateResponse(query, fullPrompt);
        console.log('Response from Replicate:', response);
      } else {
        response = await fetchOpenaiResponse(query, fullPrompt);
        console.log('Response from GPT-4:', response);
      }

      conversationHistory.push(`${modelName}: ${response}`)

    } catch (error) {
      console.error(`Failed to fetch response from ${modelName}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
}
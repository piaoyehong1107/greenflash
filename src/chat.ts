import * as readlineSync from 'readline-sync';
import { llmNames} from './llms';
import { fetchOpenaiResponse, fetchLlama3Response, fetchReflectionResponse } from './api';
import { askForRating, askForConversion } from './conversion';

export async function askForModelChoice(): Promise<string> {
  console.log('\nPlease choose a model:\n');

  llmNames.forEach((model, index) => {
    console.log(`${index + 1}. ${model}`);
  });

  const choiceIndex = readlineSync.questionInt('\nEnter the number corresponding to your model choice: ') - 1;

  if (choiceIndex < 0 || choiceIndex >= llmNames.length) {
    console.log('\nInvalid choice. Please try again.');
    return askForModelChoice();
  }
  return llmNames[choiceIndex];
}

export async function startChat(modelName: string): Promise<void> {
  console.log(`\nStarting chat with model: ${modelName}`);

  let query: string;
  let systemPrompt: string
  let conversationHistory: string[] = [];

 systemPrompt = readlineSync.question("\nWould you like to provide a system prompt?(Default No)", {
    defaultInput: 'No'
  })
  if (systemPrompt.toLowerCase() ==='no'){
    systemPrompt = "You are a very helpful, respectful and honest assistant."
    console.log("\nNo system prompt provided. Continuing with the default system prompt:", systemPrompt)

  } else{
    console.log("\nSystem prompt provided:", systemPrompt)
    conversationHistory.push(`System prompt: ${systemPrompt}`)
  }

  do {
    query = readlineSync.question('\nEnter your query (type "exit" to quit): ');
    if (query.toLowerCase() === 'exit') {
      console.log('\nExiting the chat. Goodbye!\n');
      console.log('==============================')
      break;
    }
    conversationHistory.push(`You: ${query}`);

    try {
      let response: string;
      const fullPrompt = `${conversationHistory.join('\n')}`

      if (modelName.toLowerCase() === 'llama3') {
        response = await fetchLlama3Response(systemPrompt, fullPrompt);
        console.log('\nResponse from Llama3:', response);

      } else if (modelName.toLowerCase() === 'reflection') {
        response = await fetchReflectionResponse(fullPrompt);
        console.log('\nResponse from Reflection:', response);
      } else {
        response = await fetchOpenaiResponse(systemPrompt, fullPrompt);
        console.log('\nResponse from GPT-4:', response);
      }
      conversationHistory.push(`${modelName}: ${response}`)
    } catch (error) {
      console.error(`\nFailed to fetch response from ${modelName}:`, error, '\n');
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
  askForConversion();
}
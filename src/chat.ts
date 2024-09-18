import * as readlineSync from 'readline-sync';
import { llmNames} from './llms';
import { fetchOpenaiResponse, fetchLlama3Response, fetchReflectionResponse } from './api';
import { askForRating, askForConversion } from './conversion';

export async function askForModelChoice(): Promise<string> {
  console.log()
  console.log('Please choose a model:');
  console.log()
  llmNames.forEach((model, index) => {
    console.log(`${index + 1}. ${model}`);
  });
  console.log()
  const choiceIndex = readlineSync.questionInt('Enter the number corresponding to your model choice: ') - 1;

  if (choiceIndex < 0 || choiceIndex >= llmNames.length) {
    console.log()
    console.log('Invalid choice. Please try again.');
    return askForModelChoice();
  }
  return llmNames[choiceIndex];
}

export async function startChat(modelName: string): Promise<void> {

  console.log(`Starting chat with model: ${modelName}`);
  console.log()

  let query: string;
  let systemPrompt: string
  let conversationHistory: string[] = [];

 systemPrompt = readlineSync.question("Would you like to provide a system systemPrompt?(Default No)", {
    defaultInput: 'No'
  })
  if (systemPrompt.toLowerCase() ==='no'){
    systemPrompt = "You are a very helpful, respectful and honest assistant."
    console.log()
    console.log(`No system systemPrompt provided. Continuing with the default systemPrompt: ${systemPrompt}`)
    console.log()
  } else{
    console.log()
    console.log("System systemPrompt provided:", systemPrompt)
    console.log()
    conversationHistory.push(`System: ${systemPrompt}`)
  }

  do {
    query = readlineSync.question('Enter your query (type "exit" to quit): ');
    if (query.toLowerCase() === 'exit') {
      console.log()
      console.log('Exiting the chat. Goodbye!');
      break;
    }
    conversationHistory.push(`You: ${query}`);

    try {
      let response: string;
      const fullPrompt = `${conversationHistory.join('\n')}`
      // console.log(fullPrompt)

      if (modelName.toLowerCase() === 'llama3') {
        response = await fetchLlama3Response(systemPrompt, fullPrompt);
        console.log()
        console.log('Response from Llama3:', response);
        console.log()
      } else if (modelName.toLowerCase() === 'reflection') {
        response = await fetchReflectionResponse(fullPrompt);
        console.log()
        console.log('Response from Reflection:', response);
        console.log()
      } else {
        response = await fetchOpenaiResponse(systemPrompt, fullPrompt);
        console.log()
        console.log('Response from GPT-4:', response);
        console.log()
      }

      conversationHistory.push(`${modelName}: ${response}`)

    } catch (error) {
      console.error(`Failed to fetch response from ${modelName}:`, error);
    }

  } while (query.toLowerCase() !== 'exit');

  askForRating();
  askForConversion();
}
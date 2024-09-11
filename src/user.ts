import * as readlineSync from "readline-sync";
import { askForModelChoice, startChat } from "./chat";
import { llmNames } from "./llms";

export function getUserName(): string {
  return readlineSync.question("What is your name? ");
}

export function fnv1aHash(userName: string): string {
  let userHash = 0x811c9dc5;
  for (let i = 0; i < userName.length; i++) {
    userHash ^= userName.charCodeAt(i);
    userHash += (userHash << 1) + (userHash << 4) + (userHash << 7) + (userHash << 8) + (userHash << 24);
  }
  return ('0000000' + (userHash >>> 0).toString(16)).slice(-8);
}

export async function handleAction(options: any): Promise<void> {
  let userName = options.name || await getUserName();
  let userHash = fnv1aHash(userName)
  console.log(`FNV-1a Hash for ${userName}: ${userHash}`);

  let model = options.model || await askForModelChoice();
  let modelName = llmNames.find(llmName => llmName.toLowerCase() === model?.toLowerCase());

  if (!modelName) {
    console.log(`Invalid model. Please choose a valid model.`);
    model = await askForModelChoice();
    modelName = llmNames.find(llmName => llmName.toLowerCase() === model?.toLowerCase());
  }

  console.log(`Hello, ${userName}! Welcome to the CLI application.`);
  console.log(`Model chosen: ${modelName}`);

  if (userName && modelName) {
    console.log(`Processing to chat...`);
    await startChat(modelName);
  } else {
    console.error('Error: Missing user name or invalid model choice.');
  }
}

export function askForRating(): void {
  const rating = readlineSync.question('Please rate the chat (👍 or 👎): ');
  if (rating === '👍') {
      console.log('Thank you for the positive feedback!');
  } else if (rating === '👎') {
      console.log('Sorry to hear that. We appreciate your feedback!');
  } else {
      console.log('Invalid rating. Please provide either 👍 or 👎.');
  }
}

export function askForConversion(): void {
  const wantsConversion = readlineSync.question('Would you like to associate a conversion with the chat? (Default No): ', {
    defaultInput: 'No'
  }).toLowerCase();

  if (wantsConversion === 'yes') {
    const conversionValue = readlineSync.question('Please provide the value for the conversion (1~10): ');
    console.log(`Conversion value recorded: ${conversionValue}`);
  } else {
    console.log('No conversion associated with the chat. Ending the process.');
  }
}
import { Command } from "commander";
import { getUserName, fnv1aHash} from "./user";
import { llmNames } from "./llms";
import { startChat, askForModelChoice } from "./chat";

const program = new Command();

program
  .version('1.0.0')
  .description('CLI Chat Application with LLM')
  .option('-n, --name <name>', 'Specify your name')
  .option('-m, --model <model>', 'Choose the model to use')
  .action(handleChat);

program.parse(process.argv);

export async function handleChat(options: any): Promise<void> {
  let userName = options.name || await getUserName();
  let userHash = fnv1aHash(userName)
  console.log(`FNV-1a Hash for ${userName}: ${userHash}`);

  let model = options.model || await askForModelChoice();
  let modelName = llmNames.find(llmName => llmName.toLowerCase() === model?.toLowerCase());

  if (!modelName) {
    console.log()
    console.log(`Invalid model. Please choose a valid model.`);
    model = await askForModelChoice();
    modelName = llmNames.find(llmName => llmName.toLowerCase() === model?.toLowerCase());
  }

  console.log()
  console.log(`Hello, ${userName}! Welcome to the CLI application.`);
  console.log()
  console.log(`Model chosen: ${modelName}`);

  if (userName && modelName) {
    console.log()
    console.log(`Processing to chat...`);
    console.log()
    await startChat(modelName);
  } else {
    console.log()
    console.error('Error: Missing user name or invalid model choice.');
  }
}

function handleExit() {
  process.exit();
}

process.on('SIGINT', () => {
  console.log('\nExiting...');
  handleExit();
});

process.on('SIGTERM', () => {
  console.log('\nTerminating...');
  handleExit();
});



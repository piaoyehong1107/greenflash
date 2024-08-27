import { Command } from "commander";
import { getUserName } from "./user";
import { startChat, askForModelChoice } from "./chat";
import { askForRating } from './user';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI Chat Application with LLM')
  .option('-n, --name <name>', 'Specify your name')
  .option('-m, --model <model>', 'Choose the model to use')
  .action(async (options) => {
    let userName = options.name || await getUserName(); 
    let modelName = options.model || await askForModelChoice(); 

    console.log(`Hello, ${userName}! Welcome to the CLI application.`);
    console.log(`Model chosen: ${modelName}`);

    console.log(`Processing directly to chat...`);
    await startChat(modelName);
  });

program.parse(process.argv);

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

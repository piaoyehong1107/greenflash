import { Command } from "commander";
import { getUserName } from "./user";
import { startChat, askForModelChoice } from "./chat";
import { llms, llmNames } from "./llms";

const program = new Command();

program
  .version('1.0.0')
  .description('CLI Chat Application with LLM')
  .option('-n, --name <name>', 'Specify your name')
  .option('-m, --model <model>', 'Choose the model to use')
  .action(async (options) => {
    let userName = options.name || await getUserName(); 
    let model = options.model || await askForModelChoice(); 
    let modelName = llmNames.find(llmName => llmName.toLowerCase() === model.toLowerCase())

    console.log(`Hello, ${userName}! Welcome to the CLI application.`);
    console.log(`Model chosen: ${modelName}`);

    if (userName && modelName){
      console.log(`Processing to chat...`);
      await startChat(modelName);
    }else{
      console.error('Error: Missing user name or invalid model choice.')
    }
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

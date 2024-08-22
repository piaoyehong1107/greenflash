import { Command } from "commander";
import { getUserName } from "./user";
import { startChat } from "./chat";
import { askForRating } from './user';

const program = new Command();

program
  .version("1.0.0")
  .description("CLI Chat Application with LLM")
  .action(async () => {
    const userName = getUserName();
    console.log(`Hello, ${userName}! Welcome to the CLI application.`);
    await startChat();
  });


program.parse(process.argv);

function handleExit() {
  askForRating();
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
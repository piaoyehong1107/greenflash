import { Command } from "commander";
import { handleAction} from "./user";


const program = new Command();

program
  .version('1.0.0')
  .description('CLI Chat Application with LLM')
  .option('-n, --name <name>', 'Specify your name')
  .option('-m, --model <model>', 'Choose the model to use')
  .action(handleAction);

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



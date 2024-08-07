import { Command } from 'commander';
import readlineSync from 'readline-sync';
import axios from 'axios';

const program = new Command();

const llms = [
    {name: 'GPT-4', apiKey: 'MY_API_KEY'},
    {name: 'Claude', apiKey: 'MY_API_KEY'},
    {name: 'Llama3', apiKey: 'MY_API_KEY'}
]
const llmNames = llms.map(llm => llm.name)

program
    .version('1.0.0')
    .description ('CLI Chat Application with LLM')
    .action(() => {
        const userName = readlineSync.question('What is your name? ');
        console.log(`Hello, ${userName}! Welcome to the CLI application.`);
      
      const index = readlineSync.keyInSelect(llmNames, "Which LLM?")
      if (index === -1){
        console.log('No model selected, exiting.')
      }else{
        console.log(`You started chat with + ${llmNames[index]}`)
      }
    });
program.parse(process.argv)
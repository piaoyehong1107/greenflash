import readlineSync from 'readline-sync';
import axios from 'axios';

// Define LLM options
const llms = [
  { name: 'GPT-3', apiKey: 'YOUR_OPENAI_API_KEY', model: 'text-davinci-003' }, // Replace with your API key and model
  { name: 'GPT-4', apiKey: 'YOUR_OPENAI_API_KEY', model: 'gpt-4' } // Replace with your API key and model
  // Add other LLMs as needed
];

// Class definition for ChatApp
class ChatApp {
  private userName: string;
  private selectedLLM: { name: string; apiKey: string; model: string };
  private messages: string[] = [];

  constructor(userName: string, selectedLLM: { name: string; apiKey: string; model: string }) {
    this.userName = userName;
    this.selectedLLM = selectedLLM;
    this.startChat();
  }

  private startChat(): void {
    console.log(`Welcome ${this.userName}! You are now chatting with ${this.selectedLLM.name}. Type 'exit' to end the chat.`);

    let isRunning = true;
    while (isRunning) {
      const userInput = readlineSync.question(`${this.userName}: `);
      if (userInput.toLowerCase() === 'exit') {
        isRunning = false;
        console.log('Exiting the chat...');
        this.askForRating();
      } else {
        this.addMessage(userInput);
        this.displayMessages();
        this.getLLMResponse(userInput);
      }
    }
  }

  private addMessage(message: string): void {
    this.messages.push(`${this.userName}: ${message}`);
  }

  private displayMessages(): void {
    console.clear();
    this.messages.forEach(message => console.log(message));
  }

  private async getLLMResponse(userMessage: string): Promise<void> {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: this.selectedLLM.model,
          prompt: userMessage,
          max_tokens: 150
        },
        {
          headers: {
            'Authorization': `Bearer ${this.selectedLLM.apiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // const llmResponse = response.data.choices[0].text.trim();
      // this.messages.push(`${this.selectedLLM.name}: ${llmResponse}`);
    } catch (error) {
      console.error('Error fetching response from LLM:', error);
      this.messages.push(`${this.selectedLLM.name}: Sorry, I couldn't process that request.`);
    }
  }

  private askForRating(): void {
    const rating = readlineSync.question('Please rate the chat (👍 or 👎): ');
    if (rating === '👍') {
      console.log('Thank you for the positive feedback!');
    } else if (rating === '👎') {
      console.log('Sorry to hear that. We appreciate your feedback!');
    } else {
      console.log('Invalid rating. Please provide either 👍 or 👎.');
    }
  }
}

// Prompt for user name
const userName = readlineSync.question('Please enter your name: ');

// Prompt for LLM selection
const llmNames = llms.map(llm => llm.name);
const selectedLLMName = readlineSync.keyInSelect(llmNames, 'Choose a language model:');
if (selectedLLMName === -1) {
  console.log('No selection made. Exiting...');
  process.exit(1);
}

// Find the selected LLM
const selectedLLM = llms.find(llm => llm.name === llmNames[selectedLLMName]);
if (!selectedLLM) {
  console.log('Invalid LLM selection. Exiting...');
  process.exit(1);
}

// Start the chat application
new ChatApp(userName, selectedLLM);
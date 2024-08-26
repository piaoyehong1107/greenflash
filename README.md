# TypeScript Chat

TypeScript Chat is a CLI tool that allows you to chat with a number of different LLMs.

---

## Project Description

Write a command line tool that allows users to chat with different LLMs, then rate the chat quality and associate conversions.

### Prerequisites

1. Research TypeScript CLI tools to determine the best packages to use.

### Chat App

Build a CLI chat app with the following workflow:

0. Before starting the process, the user can pass in flags for their name (step 1) and model choice (step 2) below. Doing so should pass those values to those steps and skip asking the user when the process starts.
   - E.g., `pnpm start -- --name "devin owen" --model chatgpt`
   - If both are supplied, take the user directly to step 3 (chatting with the model)
   - If only one is supplied, skip the step for that input
1. When the user starts the program, first ask for their name (we'll use this to generate an ID)
   - Generate a hash based on the name they input. You can write your own hashing algorithm (like a simple FNV-1a), or use any open source package that generates hashes (MurmurHash, MD5, SHA1, etc.). The only requirements are that the hash always return the same value for the same name, but that different names always result in a different hash.
1. Choose one of the LLMs from a list (default ChatGPT)
   - ChatGPT
   - Claude
   - Llama3
   - Smaller, weirder models from Replicate or HuggingFace
1. Ask the user if they want to provide a custom system-level prompt prior to chatting (default No)
1. Chat with that model, with an open-ended number of inputs (prompts) and outputs (model responses)
1. When the user is done, stop the chat
1. Ask for a binary rating for the chat (👍 or 👎)
1. Ask if the user wants to associate a "conversion" with the chat (default No)
   - If yes, ask for a value for the conversion (e.g., $10)
   - If no, end the process

### Timeline

- Week 1: Research CLI tools
- Week 2: Scaffold out simple commander tool in code
- Weeks 3-4 or 5: Continue to build out full tool

### Dependencise

- commander.js: Command-Line Arguments
- readline-sync: intercative prompts/ A library for synchronous command-line input
- axios: make HTTP requests

### Files

- api.ts: Contains all API-related logic, such as making HTTP requests using axios.
- chat.ts: Manages the chat logic and interacts with the API service to fetch responses from the selected LLM.
- cli.ts: Sets up the CLI commands and ensures asynchronous actions are handled appropriately.
- main.ts: Remains the entry point of the application.

---

## Usage

To run the application:

1. Copy the example environment file: `cp .env.example .env`
1. Add API keys in the `.env` file for whichever models you want to be able to chat with
1. Download dependencies: `pnpm i`
1. Run the following to start the app: `pnpm start`
   - You can optionally pass two flags when starting the process: `name` and `model`. These pre-set the inputs for steps 1 and/or 2 below and allow you to skip directly to chatting with the chosen model.
   - E.g., `pnpm start -- --name "devin owen" --model chatgpt`

Then step through the following options and get chatting:

- Add your name to associate chats with the right person
- Choose a model to chat with
- Add a custom system prompt, if you want to update the default prompt

At the end of the chat, provide a rating for the quality of the interaction. Optionally, also associate the chat with a conversion and value for that conversion.

# TypeScript Chat

TypeScript Chat is a CLI tool that allows you to chat with a number of different LLMs.

---

## Project Description

Write a command line tool that allows users to chat with different LLMs, then rate the chat quality.

### Prerequisites

1. Research TypeScript CLI tools to determine the best packages to use.

### Chat App

Build a CLI chat app with the following workflow:

1. When the user starts the program, first ask for their name (we'll use this to generate an ID)
1. Choose one of the LLMs from a list
1. Chat with that model, with an open-ended number of inputs (prompts) and outputs (model responses)
1. When the user is done, stop the chat
1. Ask for a binary rating for the chat (👍 or 👎)

---

## Usage

To run the application:

1. Copy the example environment file: `cp .env.example .env`
1. Add API keys in the `.env` file for whichever models you want to be able to chat with
1. Download dependencies: `pnpm i`
1. Run the following to start the app: `pnpm run xxxx`

Then step through the following options and get chatting:

- Choose a model to chat with
- Add a custom system prompt, if you want to update the default prompt

At the end of the chat, provide a rating for the quality of the interaction.

import * as readlineSync from 'readline-sync';
import { llmNames } from './llms';

export function startChat(): void {
    const index = readlineSync.keyInSelect(llmNames, "Which LLM?");
    if (index === -1) {
        console.log('No model selected, exiting.');
    } else {
        console.log(`You started chat with ${llmNames[index]}`);
    }
}

import * as readlineSync from "readline-sync";
import * as crypto from 'crypto';

export function getUserName(): string {
  return readlineSync.question("What is your name? ");
}
export function generateHash(name: string): string {
  return crypto.createHash('md5').update(name).digest('hex');
}

export function askForRating(): void {
  const rating = readlineSync.question('Please rate the chat (👍 or 👎): ');
  if (rating === '👍') {
      console.log('Thank you for the positive feedback!');
  } else if (rating === '👎') {
      console.log('Sorry to hear that. We appreciate your feedback!');
  } else {
      console.log('Invalid rating. Please provide either 👍 or 👎.');
  }
}

export function askForConversion(): void {
  const wantsConversion = readlineSync.question('Would you like to associate a conversion with the chat? (Default No): ', {
    defaultInput: 'No'
  }).toLowerCase();

  if (wantsConversion === 'yes') {
    const conversionValue = readlineSync.question('Please provide the value for the conversion (1~10): ');
    console.log(`Conversion value recorded: ${conversionValue}`);
  } else {
    console.log('No conversion associated with the chat. Ending the process.');
  }
}
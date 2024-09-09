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
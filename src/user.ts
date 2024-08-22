import * as readlineSync from "readline-sync";

export function getUserName(): string {
  return readlineSync.question("What is your name? ");
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
import * as readlineSync from "readline-sync";

export function askForRating(): void {
  console.log()
    const rating = readlineSync.question('Please rate the chat (👍 or 👎): ');
    if (rating === '👍') {
        console.log()
        console.log('Thank you for the positive feedback!');
    } else if (rating === '👎') {
        console.log()
        console.log('Sorry to hear that. We appreciate your feedback!');
    } else {
        console.log()
        console.log('Invalid rating. Please provide either 👍 or 👎.');
        askForRating()
    }
  }
  
  export function askForConversion(): void {
    console.log()
    const wantsConversion = readlineSync.question('Would you like to associate a conversion with the chat? (Default No): ', {
      defaultInput: 'No'
    }).toLowerCase();
  
    if (wantsConversion === 'yes') {
      console.log()
      const conversionValue = readlineSync.question('Please provide the value for the conversion (1~10): ');
      console.log()
      console.log(`Conversion value recorded: ${conversionValue}`);
      console.log()
    } else {
      console.log()
      console.log('No conversion associated with the chat. Ending the process.');
      console.log()
    }
  }
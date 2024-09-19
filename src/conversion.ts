import * as readlineSync from "readline-sync";

export function askForRating(): void {
    const rating = readlineSync.question('\nPlease rate the chat (👍 or 👎): ');
    if (rating === '👍') {
        console.log('\nThank you for the positive feedback!');
    } else if (rating === '👎') {
        console.log('\nSorry to hear that. We appreciate your feedback!');
    } else {
        console.log('\nInvalid rating. Please provide either 👍 or 👎.');
        askForRating()
    }
  }
  
  export function askForConversion(): void {
    const wantsConversion = readlineSync.question('\nWould you like to associate a conversion with the chat? (Default No): ', {
      defaultInput: 'No'
    }).toLowerCase();
  
    if (wantsConversion === 'yes') {
      const conversionValue = readlineSync.question('\nPlease provide the value for the conversion (1~10): ');
      console.log(`\nConversion value recorded: ${conversionValue}\n`);
    } else {
      console.log('\nNo conversion associated with the chat. Ending the process.\n');
    }
  }
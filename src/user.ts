import * as readlineSync from "readline-sync";

export function getUserName(): string {
  return readlineSync.question("What is your name? ");
}

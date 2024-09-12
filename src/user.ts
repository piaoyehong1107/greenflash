import * as readlineSync from "readline-sync";

export function getUserName(): string {
  return readlineSync.question("What is your name? ");
}

export function fnv1aHash(userName: string): string {
  let userHash = 0x811c9dc5;
  for (let i = 0; i < userName.length; i++) {
    userHash ^= userName.charCodeAt(i);
    userHash += (userHash << 1) + (userHash << 4) + (userHash << 7) + (userHash << 8) + (userHash << 24);
  }
  return ('0000000' + (userHash >>> 0).toString(16)).slice(-8);
}

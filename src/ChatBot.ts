import * as readline from 'node:readline/promises';
import { Greet, Help, Weather, Hello, Exit } from './classes/classes';

export const rl: readline.Interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `
ChatBot main menu
You can run the following commands:
- For a personalized greeting, type 'greet' followed by your first name (e.g., 'greet james')
- 'help': Get more information about using the ChatBot.
- To check the weather, type 'weather' followed by a location (e.g., 'weather london')
- 'hello': Greet the bot.
- 'exit': Close the ChatBot.
  > `,
});

export class ChatBot {
  executeCommand(command: string): void {
    if (!command) {
      console.error('-> No command entered, please provide a command and press Enter');
      rl.prompt();
      return;
    }
    const trimmedCommand: string = command.trim();
    const [action, ...args]: string[] = trimmedCommand.split(' ');
    
    switch (action) {
      case 'greet':
        new Greet().execute(args);
        break;
      case 'help':
        new Help().execute(action);
        break;
      case 'weather':
        new Weather().execute(args);
        break;
      case 'hello':
        new Hello().execute(action);
        break;
      case 'exit':
        new Exit().execute(action);
        break;
      default:
        console.error(`-> Command not recognized, please type help for more info`);
        break;
      }
      rl.prompt();
  }
}
const readline = require('node:readline/promises');
const { Greet, Help, Weather, Hello, Exit } = require('./classes/classes')

export const rl = readline.createInterface({
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
    const trimmedCommand = command.trim();
    const [action, ...args] = trimmedCommand.split(' ');
  
    switch (action) {
      case 'greet':
        new Greet().execute(args);
        break;
      case 'help':
  new Help().execute();
        break;
      case 'weather':
        new Weather().execute(args);
        break;
      case 'hello':
        new Hello().execute();
        break;
      case 'exit':
        new Exit().execute();
        break;
      default:
        console.log(`-> Command not recognized, please type help for more info`);
        break;
      }
      rl.prompt();
  }
}
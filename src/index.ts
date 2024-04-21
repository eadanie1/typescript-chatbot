import { ChatBot } from "./ChatBot";
import * as readline from 'node:readline/promises';


const rl = readline.createInterface({
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

rl.prompt();

rl.on('line', (command) => {
  const trimmedCommand = command.trim();
  const [action, ...args] = trimmedCommand.split(' ');

  switch (action) {
    case 'greet':
      if (args.length === 0) {
        console.log('Please enter your first name for a personalized greeting');
      } else {
        const firstName = args.join('');
        console.log(`Welcome to ChatBot 1.0 ${firstName}! Hope you enjoy your session`);
      }
      break;
    case 'help':
      console.log(`
How to use:

- Type 'help' to see this message again
- Type 'weather' <location> to diplay the forecast for a specific location
- Type 'hello' to greet the bot
- Type 'exit' to close the ChatBot

Enjoy chatting with ChatBot!
      `);
      break;
    case 'weather':
      if (args.length === 0) {
        console.log('Please specify a location. For example: weather london')
      } else {
        const location = args.join('')
        console.log(`-> Forecast in ${location}: Sunny skies!`);
      }
      break;
    case 'hello':
      console.log('-> world!');
      break;
    case 'hello':
      console.log('-> world!');
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log(`-> Command not recognized, please type help for more info`);
      break;
    }
    rl.prompt();
});

const exitHandler = () => {
  rl.close();
  process.stdout.write('\nExit successful, have a great day! ');
  process.exit(0);
};

process.on('SIGINT', exitHandler);

rl.on('close', () => {
  process.stdout.write('\nExit successful, have a great day! ');
  process.exit(0);
});

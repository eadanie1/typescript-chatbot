import { ChatBot, rl } from "./ChatBot";
const chatBot: ChatBot = new ChatBot();

rl.prompt();

rl.on('line', chatBot.executeCommand);

const exitHandler = (): void => {
  rl.close();
  process.stdout.write('\nExit successful, have a great day! ');
  process.exit(0);
};

process.on('SIGINT', exitHandler);

rl.on('close', (): void => {
  process.stdout.write('\nExit successful, have a great day! ');
  process.exit(0);
});
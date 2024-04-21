const { ChatBot, rl } = require('./ChatBot');
const chatBot = new ChatBot();

rl.prompt();

rl.on('line', chatBot.executeCommand);

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
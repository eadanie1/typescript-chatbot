import { rl } from '../ChatBot';

export interface Command {
  execute(input: string[] | string): void;
}

export class Greet implements Command {
  execute(args: string[]): void {
    if (args.length === 0) {
      console.log('Please enter your first name for a personalized greeting');
    } else {
      const firstName: string = args.join('');
      console.log(`Welcome to ChatBot 1.0 ${firstName}! Hope you enjoy your session`);
    }
  }
}

export class Help implements Command {
  execute(input: string): void {
    console.log(`
  How to use:
  
  - Type 'help' to see this message again
  - Type 'weather' <location> to diplay the forecast for a specific location
  - Type 'hello' to greet the bot
  - Type 'exit' to close the ChatBot
  
  Enjoy chatting with ChatBot!
        `);
  }
}

export class Weather implements Command {
  execute(args: string[]): void {
    if (args.length === 0) {
      console.log('Please specify a location. For example: weather london')
    } else {
      const location: string = args.join('')
      console.log(`-> Forecast in ${location}: Sunny skies!`);
    }
  }
}

export class Hello implements Command {
  execute(input: string): void {
    console.log('-> Hello there, welcome to this ChatBot session!');
  }
}

export class Exit implements Command {
  execute(input: string): void {
    rl.close();
  }
}
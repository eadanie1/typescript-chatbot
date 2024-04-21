
interface Command {
  execute(input: string): string;
}

export class ChatBot {
  executeCommand(command: string): string {
    switch(command) {
      case "help":
        return "Here is the help text.";
      default:
        return "Unknown command.";
    }
  }
}
import { ChatBot, rl } from "../ChatBot";
import { Exit, Greet, Hello, Help, Weather } from "../classes/classes";

describe('Greet.execute', (): void => {
  it('should return a default error message to please input a name', (): void => {
    const args: string[] = [];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Greet().execute(args);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/personalized/));
    
    consoleSpy.mockRestore();
  });
  
  it('should return a greeting message with the passed name', (): void => {
    const args: string[] = ['daniel'];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Greet().execute(args);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/daniel/));
    
    consoleSpy.mockRestore();
  });
});

describe('Help.execute', (): void => {
  it('should return a help menu after input is help', (): void => {
    const action: string = 'help';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    
    if (action === 'help') {
      new Help().execute(action);
      expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/<location>/));
    } else {
      expect(consoleSpy).not.toHaveBeenCalled();
    }
    consoleSpy.mockRestore();
  });
});

describe('Weather.execute', (): void => {
  it('should return an error message if the location is missing in the input', (): void => {
    const args: string[] = [];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    
    new Weather().execute(args);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/specify/));
    
    consoleSpy.mockRestore();
  });
  
  it('should return a weather forecast message to input weather + <location>', (): void => {
    const args: string[] = ['stockholm'];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Weather().execute(args);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/stockholm/));
    
    consoleSpy.mockRestore();
  });
});

describe('Hello.execute', (): void => {
  it('should return a welcome message to input hello', (): void => {
    const action: string = 'hello';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    
    new Hello().execute(action);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/session/));

    consoleSpy.mockRestore();
  });

  it('should not execute anything if input is not hello', (): void => {
    const action: string = 'not_hello';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    const executeCommandSpy = jest.spyOn(ChatBot.prototype, 'executeCommand');

    new ChatBot().executeCommand(action);

    expect(executeCommandSpy).toHaveBeenCalledWith(action);
    expect(consoleSpy).not.toHaveBeenCalled();
    
    executeCommandSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

describe('Exit.execute', (): void => {
  it('should exit successfully and return exit message to input exit', (): void => {
    const action: string = 'exit';
    const rlCloseSpy = jest.spyOn(rl, 'close').mockImplementation(() => {});
    
    new Exit().execute(action);
    expect(rlCloseSpy).toHaveBeenCalled();

    rlCloseSpy.mockRestore();
  });

  // it('should not execute anything if input is not exit', (): void => {
  //   const action: string = 'not_exit';
  //   const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
  //   const executeCommandSpy = jest.spyOn(ChatBot.prototype, 'executeCommand');

  //   new ChatBot().executeCommand(action);

  //   expect(executeCommandSpy).toHaveBeenCalledWith(action);
  //   expect(consoleSpy).not.toHaveBeenCalled();
    
  //   executeCommandSpy.mockRestore();
  //   consoleSpy.mockRestore();
  // });
});

describe('default', () => {
  it('should handle unrecognized commands', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    new ChatBot().executeCommand('unknownd-command');

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/not recognized/));

    consoleErrorSpy.mockRestore();
  });
});
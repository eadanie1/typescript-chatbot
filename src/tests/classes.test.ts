import { ChatBot, rl } from "../ChatBot";
import { Exit, Greet, Hello, Help, Weather } from "../classes/classes";


// Unit testing of each command method

describe('Greet.execute', (): void => {
  it('should return a greeting message with the passed name', (): void => {
    const args: string[] = ['daniel'];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Greet().execute(args);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/daniel/));
    
    consoleSpy.mockRestore();
  });

  it('should return an error message if the name is missing in the input', (): void => {
    const args: string[] = [];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Greet().execute(args);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/personalized/));
    
    consoleSpy.mockRestore();
  });
});

describe('Help.execute', (): void => {
  it('should return a help menu after input is help', (): void => {
    const action: string = 'help';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    
    new Help().execute(action);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/<location>/));

    consoleSpy.mockRestore();
  });
});

describe('Weather.execute', (): void => {
  it('should return a weather forecast message to input weather + <location>', (): void => {
    const args: string[] = ['Stockholm'];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');

    new Weather().execute(args);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/Stockholm/));
    
    consoleSpy.mockRestore();
  });

  it('should return an error message if the location is missing in the input', (): void => {
    const args: string[] = [];
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    
    new Weather().execute(args);
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/specify/));
    
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
});

describe('Exit.execute', (): void => {
  it('should exit successfully and return exit message to input exit', (): void => {
    const action: string = 'exit';
    const rlCloseSpy: jest.SpyInstance = jest.spyOn(rl, 'close').mockImplementation((): void => {});
    
    new Exit().execute(action);
    expect(rlCloseSpy).toHaveBeenCalled();
    
    rlCloseSpy.mockRestore();
  });
  
  it('should not execute anything if input is not exit', (): void => {
    const action: string = 'not_exit';
    const rlCloseSpy: jest.SpyInstance = jest.spyOn(rl, 'close').mockImplementation((): void => {});
    
    new ChatBot().executeCommand(action);
    expect(rlCloseSpy).not.toHaveBeenCalled();
    
    rlCloseSpy.mockRestore();
  });
});

// Unit testing for routing of switch/case function

describe('ChatBot-routing', (): void => {
  it('should delegate each call to the correct method', (): void => {
    const action: string = 'hello';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    const executeCommandSpy: jest.SpyInstance = jest.spyOn(ChatBot.prototype, 'executeCommand');

    new ChatBot().executeCommand(action);

    expect(executeCommandSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(action, 'i')));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(new RegExp(action, 'i')));
    
    executeCommandSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});

// Unit testing for unknown / malformed commands

describe('default-case', (): void => {
  it('should handle unrecognized commands', (): void => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation((): void => {});
    new ChatBot().executeCommand('unknownd-command');

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringMatching(/not recognized/));

    consoleErrorSpy.mockRestore();
  });
});

// Unit testing for empty command

describe('ChatBot-empty-input', (): void => {
  it('should not place any call upon empty input', (): void => {
    const action: string = '';
    const consoleSpy: jest.SpyInstance = jest.spyOn(console, 'log');
    const executeCommandSpy: jest.SpyInstance = jest.spyOn(ChatBot.prototype, 'executeCommand');
    
    new ChatBot().executeCommand(action);
    
    expect(executeCommandSpy).toHaveBeenCalledWith('');
    expect(consoleSpy).not.toHaveBeenCalled();
    
    executeCommandSpy.mockRestore();
    consoleSpy.mockRestore();
  });
});
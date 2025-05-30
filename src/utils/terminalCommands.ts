
import { sendToOllama } from './ollamaUtils';

export interface CommandResult {
  type: 'string' | 'function' | 'async';
  value: string | (() => void) | ((args: string) => string) | ((args: string) => Promise<string>);
}

export const createCommands = (
  setHistory: (history: string[] | ((prev: string[]) => string[])) => void,
  setActiveTab: (tab: string) => void,
  setUserBio: (bio: string) => void,
  setUserTwitter: (twitter: string) => void,
  userNickname: string = ''
) => {
  const commands: Record<string, CommandResult> = {
    help: {
      type: 'string',
      value: 'Available commands: help, clear, status, neural, scan, deploy, profile, dashboard, setbio, settwitter, ask'
    },
    clear: {
      type: 'function',
      value: () => {
        console.log('Clear command executed - resetting history');
        const welcomeMessage = userNickname 
          ? `Welcome ${userNickname.toUpperCase()} to Titan Terminal v1.0.0`
          : 'Welcome to Titan Terminal v1.0.0';
        
        setHistory([
          welcomeMessage,
          'Neural network interface initialized...',
          'Type "help" for available commands',
        ]);
      }
    },
    status: {
      type: 'string',
      value: 'System: Online | Neural Core: Active | Memory: 2.4GB/4GB'
    },
    neural: {
      type: 'string',
      value: 'Neural network processing... [████████████] 100%'
    },
    scan: {
      type: 'string',
      value: 'Scanning network... Found 3 active nodes'
    },
    deploy: {
      type: 'string',
      value: 'Deploying to production... ✓ Success'
    },
    profile: {
      type: 'function',
      value: () => setActiveTab('profile')
    },
    dashboard: {
      type: 'function',
      value: () => setActiveTab('dashboard')
    },
    setbio: {
      type: 'function',
      value: (args: string) => {
        const newBio = args || 'No bio provided';
        setUserBio(newBio);
        return `Bio updated: ${newBio}`;
      }
    },
    settwitter: {
      type: 'function',
      value: (args: string) => {
        const newTwitter = args.startsWith('@') ? args : `@${args}`;
        setUserTwitter(newTwitter);
        return `Twitter updated: ${newTwitter}`;
      }
    },
    ask: {
      type: 'async',
      value: async (args: string) => {
        if (!args.trim()) {
          return 'Usage: ask <your question>';
        }
        return await sendToOllama(args);
      }
    }
  };

  return commands;
};

export const executeCommand = async (
  command: string,
  args: string[],
  commands: Record<string, CommandResult>
): Promise<string | null> => {
  console.log('Executing command:', command, 'with args:', args);
  const cmd = commands[command];
  if (!cmd) {
    return `Command not found: ${command}`;
  }

  if (cmd.type === 'string') {
    return cmd.value as string;
  } else if (cmd.type === 'async') {
    const func = cmd.value as (args: string) => Promise<string>;
    return await func(args.join(' '));
  } else {
    const func = cmd.value as (() => void) | ((args: string) => string);
    if (command === 'setbio' || command === 'settwitter') {
      return (func as (args: string) => string)(args.join(' '));
    } else {
      (func as () => void)();
      return null;
    }
  }
};

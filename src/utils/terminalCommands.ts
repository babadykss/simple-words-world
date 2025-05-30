
export interface CommandResult {
  type: 'string' | 'function';
  value: string | (() => void) | ((args: string) => string);
}

export const createCommands = (
  setHistory: (history: string[] | ((prev: string[]) => string[])) => void,
  setActiveTab: (tab: string) => void,
  setUserBio: (bio: string) => void,
  setUserTwitter: (twitter: string) => void
) => {
  const commands: Record<string, CommandResult> = {
    help: {
      type: 'string',
      value: 'Available commands: help, clear, status, neural, scan, deploy, profile, dashboard, setbio, settwitter'
    },
    clear: {
      type: 'function',
      value: () => {
        setHistory([
          'Welcome to Titan Terminal v1.0.0',
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
    }
  };

  return commands;
};

export const executeCommand = (
  command: string,
  args: string[],
  commands: Record<string, CommandResult>
): string | null => {
  const cmd = commands[command];
  if (!cmd) {
    return `Command not found: ${command}`;
  }

  if (cmd.type === 'string') {
    return cmd.value as string;
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

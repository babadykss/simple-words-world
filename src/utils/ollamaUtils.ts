
const OLLAMA_URL = 'http://localhost:11434/api/chat';

export const sendToOllama = async (message: string): Promise<string> => {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2', // или какая у тебя модель
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        stream: false
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.message?.content || 'AI не ответил';
  } catch (error) {
    console.error('Ошибка при обращении к Ollama:', error);
    if (error instanceof Error && error.name === 'TypeError') {
      return 'Ошибка: не удается подключиться к AI серверу (проверь что Ollama запущен)';
    }
    return `Ошибка AI: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`;
  }
};


// Background script for extension installation handling
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome page in new tab when extension is first installed
    chrome.tabs.create({
      url: chrome.runtime.getURL('welcome.html')
    });
  }
});

// Check if user is logged in when extension icon is clicked
chrome.action.onClicked.addListener(async () => {
  const result = await chrome.storage.local.get(['isLoggedIn']);
  
  if (!result.isLoggedIn) {
    // User not logged in, redirect to welcome page
    chrome.tabs.create({
      url: chrome.runtime.getURL('welcome.html')
    });
  } else {
    // User is logged in, open popup
    chrome.action.setPopup({
      popup: 'popup.html'
    });
  }
});

// Listen for messages from welcome page and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveUserData') {
    // Save user data to storage
    chrome.storage.local.set({
      userNickname: request.nickname,
      isLoggedIn: true,
      loginDate: new Date().toISOString()
    }).then(() => {
      // Enable popup after successful login
      chrome.action.setPopup({
        popup: 'popup.html'
      });
      sendResponse({ success: true });
    }).catch((error) => {
      console.error('Error saving user data:', error);
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'getUserData') {
    chrome.storage.local.get(['userNickname', 'isLoggedIn']).then((result) => {
      sendResponse(result);
    }).catch((error) => {
      console.error('Error getting user data:', error);
      sendResponse({ isLoggedIn: false });
    });
    return true;
  }

  // Handle Ollama API requests
  if (request.action === 'sendToOllama') {
    fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama2',
        messages: [
          {
            role: 'user',
            content: request.message
          }
        ],
        stream: false
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      sendResponse({ 
        success: true, 
        content: data.message?.content || 'AI не ответил' 
      });
    })
    .catch(error => {
      console.error('Ошибка при обращении к Ollama:', error);
      let errorMessage = 'Ошибка AI: неизвестная ошибка';
      
      if (error.name === 'TypeError') {
        errorMessage = 'Ошибка: не удается подключиться к AI серверу (проверь что Ollama запущен)';
      } else {
        errorMessage = `Ошибка AI: ${error.message}`;
      }
      
      sendResponse({ 
        success: false, 
        error: errorMessage 
      });
    });
    
    return true; // Keep message channel open for async response
  }
});

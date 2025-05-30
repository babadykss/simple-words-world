
// Background script for extension installation handling
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open welcome window when extension is first installed
    chrome.windows.create({
      url: chrome.runtime.getURL('welcome.html'),
      type: 'popup',
      width: 500,
      height: 650,
      focused: true
    });
  }
});

// Listen for messages from welcome page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'saveUserData') {
    // Save user data to storage
    chrome.storage.local.set({
      userNickname: request.nickname,
      isLoggedIn: true,
      loginDate: new Date().toISOString()
    }, () => {
      sendResponse({ success: true });
    });
    return true; // Keep message channel open for async response
  }
  
  if (request.action === 'getUserData') {
    chrome.storage.local.get(['userNickname', 'isLoggedIn'], (result) => {
      sendResponse(result);
    });
    return true;
  }
});

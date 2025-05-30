
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


document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const nicknameInput = document.getElementById('nickname');
  const loginBtn = document.getElementById('loginBtn');
  const errorMessage = document.getElementById('errorMessage');
  const loadingMessage = document.getElementById('loadingMessage');

  // Focus on nickname input
  nicknameInput.focus();

  // Handle form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nickname = nicknameInput.value.trim();
    
    // Validate nickname
    if (!nickname || nickname.length < 2) {
      showError('Nickname must be at least 2 characters long');
      return;
    }

    // Show loading state
    setLoadingState(true);

    try {
      // Save user data via background script
      const response = await new Promise((resolve) => {
        chrome.runtime.sendMessage({
          action: 'saveUserData',
          nickname: nickname
        }, resolve);
      });

      if (response && response.success) {
        // Success - close welcome window and open main popup
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        showError('Failed to save user data. Please try again.');
        setLoadingState(false);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      showError('Connection error. Please try again.');
      setLoadingState(false);
    }
  });

  // Handle Enter key
  nicknameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      loginForm.dispatchEvent(new Event('submit'));
    }
  });

  // Clear error on input
  nicknameInput.addEventListener('input', () => {
    hideError();
  });

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    nicknameInput.style.borderColor = '#ef4444';
  }

  function hideError() {
    errorMessage.style.display = 'none';
    nicknameInput.style.borderColor = '#22c55e';
  }

  function setLoadingState(loading) {
    loginBtn.disabled = loading;
    nicknameInput.disabled = loading;
    
    if (loading) {
      loginBtn.textContent = 'Connecting...';
      loadingMessage.style.display = 'block';
      hideError();
    } else {
      loginBtn.textContent = 'Initialize Neural Connection';
      loadingMessage.style.display = 'none';
    }
  }
});

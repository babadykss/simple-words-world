
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
      showError('Username must be at least 2 characters');
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
        // Success - close welcome tab
        setTimeout(() => {
          window.close();
        }, 1000);
      } else {
        showError('Connection failed - try again');
        setLoadingState(false);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
      showError('System error - try again');
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
    nicknameInput.classList.add('error');
  }

  function hideError() {
    errorMessage.style.display = 'none';
    nicknameInput.classList.remove('error');
  }

  function setLoadingState(loading) {
    loginBtn.disabled = loading;
    nicknameInput.disabled = loading;
    
    if (loading) {
      loginBtn.textContent = 'Connecting...';
      loadingMessage.style.display = 'block';
      hideError();
    } else {
      loginBtn.textContent = 'Initialize Connection';
      loadingMessage.style.display = 'none';
    }
  }
});

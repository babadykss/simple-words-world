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
      const response = await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({
          action: 'saveUserData',
          nickname: nickname
        }, (response) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });

      if (response && response.success) {
        // Show success message
        showSuccess('Neural link established! Opening terminal...');
        
        // Close welcome tab after delay
        setTimeout(() => {
          chrome.tabs.getCurrent((tab) => {
            if (tab) {
              chrome.tabs.remove(tab.id);
            }
          });
        }, 1500);
      } else {
        showError(response?.error || 'Neural link failed - try again');
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

  function showSuccess(message) {
    loadingMessage.textContent = message;
    loadingMessage.style.display = 'block';
    loadingMessage.style.color = '#00ff00';
  }

  function setLoadingState(loading) {
    loginBtn.disabled = loading;
    nicknameInput.disabled = loading;
    
    if (loading) {
      loginBtn.textContent = 'CONNECTING...';
      loadingMessage.style.display = 'block';
      loadingMessage.style.color = '#ffff00';
      loadingMessage.textContent = 'Establishing neural connection...';
      hideError();
    } else {
      loginBtn.textContent = 'INITIALIZE NEURAL LINK';
      loadingMessage.style.display = 'none';
    }
  }
});

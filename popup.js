document.addEventListener('DOMContentLoaded', () => {
  const clearButton = document.getElementById('clear');
  const modal = document.getElementById('confirmModal');
  const modalMessage = document.getElementById('modalMessage');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  function showModal(message, showNoButton = true) {
      modalMessage.textContent = message;
      modal.style.display = 'flex';
      modal.classList.add('show');
      modal.classList.remove('hide');
      
      confirmNo.style.display = showNoButton ? 'inline-block' : 'none';
  }


    chrome.action.onClicked.addListener(() => {
    
    chrome.action.setBadgeText({ text: '' });
});


document.getElementById('powerdev').addEventListener('click', function () {
    window.open('https://playentry.org/profile/6609713cb01de4354dac8ed5/', '_blank');
});

document.getElementById('q').addEventListener('click', function () {
    window.open('q.html', '_blank');
});


  function hideModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      
      setTimeout(() => {
          modal.style.display = 'none';
          modal.classList.remove('hide');
      }, 300);
  }

  clearButton.addEventListener('click', async () => {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const url = new URL(tab.url);

      if (url.hostname === 'playentry.org') {
          showModal('정말로 클리너를 작동할까?', true);

          confirmYes.onclick = async () => {
              await chrome.browsingData.remove({
                  "origins": [url.origin]
              }, {
                  "indexedDB": true
              });
              chrome.tabs.reload(tab.id);
              hideModal(); 
              window.close(); 
          };

      } else {
          showModal('안전을 위해 엔트리 사이트에 접속해야 사용할수 있어.', false);

          confirmYes.onclick = () => {
              hideModal();
          };
      }

      confirmNo.onclick = () => {
          hideModal();
      };
  });
});

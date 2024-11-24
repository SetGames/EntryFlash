chrome.action.onClicked.addListener(async (tab) => {
    const url = new URL(tab.url);
  
    if (url.hostname === 'playentry.org') {
      await chrome.browsingData.remove({
        "origins": [url.origin]
      }, {
        "indexedDB": true
      });
      chrome.tabs.reload(tab.id);  
    }
  });

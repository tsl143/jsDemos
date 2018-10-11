chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.executeScript(tab.Id, {file: 'cs.js'});
});
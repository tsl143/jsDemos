browser.browserAction.onClicked.addListener(tab => {
  browser.tabs.executeScript(tab.Id, {file: 'cs.js'});
});
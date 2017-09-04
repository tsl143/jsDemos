
// Setup the page action (icon, title)
function initializePageAction(tab) {

    chrome.pageAction.setIcon({tabId: tab.id, path: "icons/icon.png"});
    chrome.pageAction.setTitle({tabId: tab.id, title: "My IP"});
    chrome.pageAction.show(tab.id);
      chrome.pageAction.setPopup({
        tabId: tab.id,
        popup: "popup/index.html"
      });  
}

// initialize page acion on each tab update
chrome.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

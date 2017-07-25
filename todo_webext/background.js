browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  browser.browserAction.setBadgeText({text: request.data.toString()});
});
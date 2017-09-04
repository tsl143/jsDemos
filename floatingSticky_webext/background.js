

browser.browserAction.onClicked.addListener(tab=>{
	const sending = browser.tabs.sendMessage(tab.id,{data:'knockKnock'});
});

browser.tabs.onActivated.addListener(tab=>{
	const sending = browser.tabs.sendMessage(tab.tabId,{data:'iAmBack'});
});

browser.tabs.onCreated.addListener(tab=>{
	const sending = browser.tabs.sendMessage(tab.tabId,{data:'iAmBack'});
});

browser.tabs.onUpdated.addListener(tabId=>{
	const sending = browser.tabs.sendMessage(tabId,{data:'iAmBack'}); 
});

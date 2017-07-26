

browser.browserAction.onClicked.addListener(tab=>{
	const sending = browser.tabs.sendMessage(tab.id,{data:'knockKnock'});
	sending.then(()=>{console.log("sent1")}); 
});

browser.tabs.onActivated.addListener(tab=>{
	const sending = browser.tabs.sendMessage(tab.tabId,{data:'iAmBack'});
	sending.then(()=>{console.log("sent2")}); 
});

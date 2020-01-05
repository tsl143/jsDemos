const handleMessage = async (id, data) => {
	const tabs = await browser.tabs.get(id);
	if (tabs.url.startsWith('http')) browser.tabs.sendMessage(id,{ data });
}

browser.browserAction.onClicked.addListener(tab=>{
	handleMessage(tab.id,knockKnock);
});

browser.tabs.onActivated.addListener(tab=>{
	handleMessage(tab.tabId, 'iAmBack');
});

browser.tabs.onCreated.addListener(tab=>{
	handleMessage(tab.tabId, 'iAmBack');
});

browser.tabs.onUpdated.addListener((tabId,c) =>{
	handleMessage(tabId, 'iAmBack');
});

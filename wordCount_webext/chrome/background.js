const countMe = info => {
	let selectedText = info.selectionText || '';
	selectedText = selectedText.replace(/,/g, ' ');
	selectedText = selectedText.replace(/;/g, ' ');
	selectedText = selectedText.replace(/\//g, ' ');
	selectedText = selectedText.replace(/\\/g, ' ');
	selectedText = selectedText.replace(/{/g, ' ');
	selectedText = selectedText.replace(/}/g, ' ');
	selectedText = selectedText.replace(/\n/g, ' ');
	selectedText = selectedText.replace(/\s\s+/g, ' ');

	let totalWords = selectedText.trim().split(' ');
	totalWords = totalWords.filter(word => {
		if (!(word.length === 1 && !word.match(/^[a-zA-Z0-9]+$/)))
			return true;
	});

	chrome.notifications.create({
		"type": "basic",
		"title": "Word Count",
		"iconUrl": chrome.runtime.getURL('icons/icon_64.png'),
		"message": `Total Words: ${totalWords.length}\nTotal Characters: ${selectedText.length}`
	});
}

chrome.contextMenus.create({
	id: "count-me",
	title: 'Word Count',
	contexts: ["all"]
});

chrome.contextMenus.onClicked.addListener(countMe);
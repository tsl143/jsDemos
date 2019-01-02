const MAX_LIMIT = 16384;
const doTheMagic = text => {
	let selectedText = text;
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

	browser.notifications.create({
		"type": "basic",
		"title": "Word Count",
		"message": `Total Words: ${totalWords.length}\nTotal Characters: ${text.length}`
	});
}

const notRestricted = (tab) => {
	const {url} = tab[0];
	if(!url.includes('http') || url.includes('addons.mozilla.org')) {
		browser.notifications.create({
			"type": "basic",
			"title": "Not Supported",
			"message": `Cannot count beyond ${MAX_LIMIT} characters on this URL/Page (browser restricted)!`
		});
		return false;
	}
	return true;
}

const countMe = info => {
	let selectedText = info.selectionText || '';
	if (selectedText.length == MAX_LIMIT) {
		browser.tabs.query({currentWindow: true, active: true})
			.then(tabs => {
				if(notRestricted(tabs)) {
					browser.tabs.executeScript({ code: `WCtargetElementId = ${info.targetElementId};` });
					browser.tabs.executeScript({ file: 'cs.js' });
				}
			})
	} else {
		doTheMagic(selectedText)
	}
}

browser.menus.create({
	id: "count-me",
	title: 'Word Count',
	contexts: ["all"]
});

browser.menus.onClicked.addListener(countMe);
browser.runtime.onMessage.addListener(({ selectionText }) => doTheMagic(selectionText));
browser.notifications.onShown.addListener(id=>{setTimeout(() => browser.notifications.clear(id), 5000)});

const CONSTANTS = {
	copyMenuId: 'copyMe',
	max: 10
}

const closeNotification = notificationId => {
	chrome.notifications.clear(notificationId);
}

const makeid = () => {
	let text = '';
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";  
	for (let i = 0; i < 5; i++)
	  text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

const notRestricted = (tab) => {
	const {url} = tab[0];
	if(!url.includes('http') || url.includes('addons.mozilla.org')) {
		chrome.notifications.create(makeid(), {
			"type": "basic",
			"title": "Not Supported",
			"iconUrl": chrome.runtime.getURL('icons/icon_64.png'),
			"message": "Cannot paste on this URL (browser restricted)"
		});
		return false;
	}
	return true;
}

const createBaseMenu = () => {
	const mainMenuObj = {
		id: CONSTANTS.copyMenuId,
		title: 'Copy This',
		contexts: ["selection"]
	}
	if (isFirefox) mainMenuObj.icons = {"32": chrome.runtime.getURL('icons/icon_32.png')};
	chrome.contextMenus.create(mainMenuObj);

	chrome.contextMenus.create({
		id: "separator",
		type: "separator",
		contexts: ["selection", "editable"]
	});
}

const setMenus = multicopy => {
	const { texts:menus = [], max = CONSTANTS.max } = multicopy;
	chrome.contextMenus.removeAll();
	createBaseMenu();
	menus.forEach((menu, index) => {
		if (index < max) {
			const menuObj = {
				id: menu.id,
				title: menu.copyText,
				contexts: ["all"]
			}
			if (isFirefox) menuObj.icons = {"32": chrome.runtime.getURL('icons/paste.png')};
			chrome.contextMenus.create(menuObj);
		}
	})
}

const copyThis = copyText => {
	localStore.get('multicopy')
		.then((res = {}) => {
			const { multicopy = {} } = res;
			const { texts = [], max } = multicopy;
			// add element to top of array
			texts.unshift({id: makeid(), copyText})
			multicopy.texts = texts;
			setMenus(multicopy);
			localStore.set({ multicopy })
		})
}

const pasteHere = id => {
	localStore.get('multicopy')
		.then((res = {}) => {
			const { multicopy = {} } = res;
			const { texts = []} = multicopy;
			const thePaste = texts.filter(t => t.id == id);
			try {
				tabs.query({currentWindow: true, active: true})
				.then((tab) => {
					if (notRestricted(tab)){
						chrome.tabs.executeScript(tab.id, {code: `multicopyCurrent = \`${thePaste[0].copyText}\`;`});
						chrome.tabs.executeScript(tab.id, {file: 'cs.js'});
					}
				})
			} catch(e) {console.log(e)}
		});
}

const copyPaste = ({menuItemId, selectionText = ''}) => {
	if (!menuItemId) return;
	if (menuItemId == CONSTANTS.copyMenuId)
		copyThis(selectionText);
	else
		pasteHere(menuItemId)
}

const init = () => {
	localStore.get('multicopy')
	.then((res = {}) => {
		const { multicopy = {} } = res;
		setMenus(multicopy)
	});
}

createBaseMenu();
init();

chrome.contextMenus.onClicked.addListener(copyPaste);
chrome.notifications.onClicked.addListener(closeNotification);
chrome.runtime.onMessage.addListener(init);

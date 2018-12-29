const deleteMe = e => {
	localStore.get('multicopy')
		.then((res = {}) => {
			const { multicopy = {} } = res;
			const { texts = [], max = 10} = multicopy;
			const filterTexts = texts.filter(t => t.id != e.target.id);
			multicopy.texts = filterTexts;
			localStore.set({ multicopy }).then(updateContextMenu);
			setData(multicopy);
		});
}

const createRow = (text, id) => {
	const tr = document.createElement('tr');
	const td1 = document.createElement('td');
	const td2 = document.createElement('td');
	const button = document.createElement('button');
	button.id = id
	td1.textContent = text;
	button.textContent = 'Delete';
	button.addEventListener('click', deleteMe)
	td2.appendChild(button);
	tr.appendChild(td1);
	tr.appendChild(td2);
	return tr;
}

const setData = multicopy => {
	const { texts = [], max = 10} = multicopy;
	document.getElementById('maxCopy').value = max;
	const tbl = document.getElementById('optionTable');
	while (tbl.firstChild) {
		tbl.removeChild(tbl.firstChild);
	}
	const tr = document.createElement('tr');
	const th1 = document.createElement('th');
	const th2 = document.createElement('th');
	th1.textContent = 'Copied Texts';
	th2.textContent = 'Action';
	tr.appendChild(th1);
	tr.appendChild(th2);
	tbl.appendChild(tr);
	texts.forEach(text => {
		tbl.appendChild(createRow(text.copyText, text.id))
	});
}

localStore.get('multicopy')
	.then((res = {}) => {
		const { multicopy = {} } = res;
		setData(multicopy);
	});

document.getElementById('maxCopy').addEventListener('keyup', e => {
	const ele = e.target;
	if(parseInt(ele.value) > 30) ele.value = 30;
	localStore.get('multicopy')
	.then((res = {}) => {
		const { multicopy = {} } = res;
		multicopy.max = ele.value;
		localStore.set({ multicopy }).then(updateContextMenu);
	});
})

document.getElementById('deleteAll').addEventListener('click', () => {
	localStore.get('multicopy')
	.then((res = {}) => {
		const { multicopy = {} } = res;
		multicopy.texts = [];
		localStore.set({ multicopy }).then(updateContextMenu);
		setData(multicopy);
	});
})

const updateContextMenu = () => {
	chrome.runtime.sendMessage({updateDemAll: true})
}

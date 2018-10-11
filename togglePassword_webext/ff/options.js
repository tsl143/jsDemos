const m = typeof browser != 'undefined' ? true : false;
const c = m ? browser : chrome;
const t = document.getElementById("togglerShortcut");
const d = document.getElementById("restoreDefault");
t.style.cssText = `
width: 200px;
padding: 5px 10px;
color: #444;
`;
d.style.cssText = `
width: 100px;
padding: 5px 10px;
color: #444;
background: transparent;
border: 1px solid #444;
text-align: center;
`;
const setShortCut = s => {
    c.commands.update({
        name: '_execute_browser_action',
        shortcut: s
    });
    t.value = s;
}
const handlePress= e => {
    if(e.key.length === 1 && /[a-zA-Z0-9]/.test(e.key)) {
        setShortCut(`Alt+Shift+${e.key.toUpperCase()}`)
    } else {
        t.value = 'Alt+Shift+';
    }
}
const showCmd = c => (t.value = c.shortcut);
const getCommands = m
    ? browser.commands.getAll().then(c => {showCmd(c[0])})
    : chrome.commands.getAll(c => showCmd(c[0]));

t.addEventListener('click', e=>{e.target.value='Alt+Shift+'})
t.addEventListener('keyup', handlePress)
d.addEventListener('click', ()=>setShortCut('Alt+Shift+P'))
    
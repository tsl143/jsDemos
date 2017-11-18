
const notePad = document.getElementById('tslNotes');
const cleanPad = document.getElementById('cleanPad');
const layOver = document.getElementById('layOver');
const yes = document.getElementById('yesPlz');
const no = document.getElementById('nope');


const gettingItem = browser.storage.local.get('tslStickyNotes');

gettingItem.then((res) => {
try{
  if(res.tslStickyNotes){
    notePad.value = res.tslStickyNotes;
  }
}catch(e){}
});

notePad.addEventListener('keyup',()=>{
    browser.storage.local.set({ tslStickyNotes: notePad.value });
}, false);

cleanPad.addEventListener('click',()=>{
    layOver.className="";
}, false);

no.addEventListener('click',()=>{
    layOver.className="hidden";
}, false);

yes.addEventListener('click',()=>{
    notePad.value = "";
    browser.storage.local.set({ tslStickyNotes: "" });
    layOver.className="hidden";
}, false);
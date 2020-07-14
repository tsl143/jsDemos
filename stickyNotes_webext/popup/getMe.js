const notePad = document.getElementById('tslNotes');
const layOver = document.getElementById('layOver');
const yes = document.getElementById('yesPlz');
const no = document.getElementById('nope');
const boldButton = document.getElementById('bold-button');
const italicButton = document.getElementById('italic-button');
const underlineButton = document.getElementById('underline-button');

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

no.addEventListener('click',()=>{
    layOver.className="hidden";
}, false);

yes.addEventListener('click',()=>{
    notePad.value = "";
    browser.storage.local.set({ tslStickyNotes: "" });
    layOver.className="hidden";
}, false);

boldButton.addEventListener('click', ()=>{
    console.log("press");
    // $('#tslNotes').css('font-weight', '700');
    document.execCommand('bold', false, null);
}, false);

italicButton.addEventListener('click', ()=>{
    console.log("press");
    // $('#tslNotes').css('font-style', 'italic');
    document.execCommand('italic', false, null);
}, false);

underlineButton.addEventListener('click', ()=>{
    console.log("press");
    // $('#tslNotes').css('text-Decoration', 'underline');
    document.execCommand('underline', false, null);
}, false);

testing.addEventListener('click', ()=>{
    console.log("press");
}, false);
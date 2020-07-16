const notePad = document.getElementById('tslNotes');
const boldButton = document.getElementById('bold-button');
const italicButton = document.getElementById('italic-button');
const underlineButton = document.getElementById('underline-button');
const cleanPad = document.getElementById('cleanPad');
const no = document.getElementById('nope');
const yes = document.getElementById('yesPlz');

const gettingItem = browser.storage.local.get('tslStickyNotes');


gettingItem.then((res) => {
    try{
        if(res.tslStickyNotes){
            notePad.innerHTML = res.tslStickyNotes;
        }
    }catch(e){}
});

cleanPad.addEventListener('click',()=>{
    layOver.className="";
}, false);

no.addEventListener('click',()=>{
    layOver.className="hidden";
}, false);

yes.addEventListener('click',()=>{
    notePad.innerHTML = "";
    browser.storage.local.set({ tslStickyNotes: "" });
    layOver.className="hidden";
}, false);

// document.getElementById('tslNotes').innerHTML = localStorage['tslNotes'] || 'type something...';
// setInterval(function() {
//     localStorage['tslNotes'] = document.getElementById('tslNotes').innerHTML;
// }, 20 * 1000);

notePad.addEventListener('keyup',()=>{
    browser.storage.local.set({ tslStickyNotes: notePad.innerHTML });
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
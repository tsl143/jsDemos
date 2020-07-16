const notePad = document.getElementById('tslNotes');
const boldButton = document.getElementById('bold-button');
const italicButton = document.getElementById('italic-button');
const underlineButton = document.getElementById('underline-button');

const gettingItem = browser.storage.local.get('tslStickyNotes');


gettingItem.then((res) => {
    try{
        if(res.tslStickyNotes){
            notePad.innerHTML = res.tslStickyNotes;
        }
    }catch(e){}
});

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
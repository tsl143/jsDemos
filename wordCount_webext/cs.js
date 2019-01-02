(function(){
    try {
        const getTextSelection = field => field.value.substring(field.selectionStart, field.selectionEnd);
        const selectionText = window.getSelection().toString() || getTextSelection(browser.menus.getTargetElement(WCtargetElementId));
        chrome.runtime.sendMessage({selectionText});
    }catch (e) {
        console.log(`Schaize: ${e}`);
    }
})();
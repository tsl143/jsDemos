
(function(){
    try {
        if(document.activeElement.hasAttribute('contentEditable'))
            document.activeElement.textContent += multicopyCurrent;
        else
            document.activeElement.value += multicopyCurrent;

        navigator.clipboard.writeText(multicopyCurrent);
    } catch(e) {
        console.log('clipboard API not supported on http page or older than 61')
    }
})()

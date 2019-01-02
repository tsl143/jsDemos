
(function(){
    try {
        document.activeElement.value += multicopyCurrent;
        navigator.clipboard.writeText(multicopyCurrent);
    } catch(e) {
        console.log('clipboard API not supported on http page or older than 61')
    }
})()


(function(){
    try {
        navigator.clipboard.writeText(multicopyCurrent);
        document.activeElement.value += multicopyCurrent;
    } catch(e) {}
})()

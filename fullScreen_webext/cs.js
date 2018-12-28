const allowFullScreen = event => {
    event.preventDefault();
    event = event || window.event;
    if (event.ctrlKey && event.keyCode == 70 && event.shiftKey) {
        if(document.documentElement.webkitRequestFullScreen) document.documentElement.webkitRequestFullScreen();
        else if(document.documentElement.mozRequestFullScreen) document.documentElement.mozRequestFullScreen();
    }
}
document.addEventListener('keyup', allowFullScreen)
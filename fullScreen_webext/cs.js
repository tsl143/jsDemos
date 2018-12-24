const allowFullScreen = event => {
    event.preventDefault();
    event = event || window.event;
    if (event.ctrlKey && event.keyCode == 70 && event.shiftKey) {
        document.documentElement.mozRequestFullScreen();
    }
}
document.addEventListener('keyup', allowFullScreen)
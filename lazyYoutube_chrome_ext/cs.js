chrome.runtime.onMessage.addListener(function(request) {
  switch (request.command) {
    case "play":
      document.querySelector(".ytp-play-button.ytp-button").click();
      break;
    case "next":
      document.querySelector(".ytp-next-button.ytp-button").click();
      break;
    default:
      break;
  }
});

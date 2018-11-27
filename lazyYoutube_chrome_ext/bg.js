chrome.commands.onCommand.addListener(function(command) {
	chrome.tabs.query({url: "*://*.youtube.com/*"}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {command}, function(response) {
		  console.log(response);
		});
	  });
});
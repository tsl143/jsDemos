//Just used until release of FF55
//Whole thing is for capturing/tweaking  capture homepage
//From FF55 
// "chrome_settings_overrides" : {
// 		"homepage": "index.html"
// },   
//wil be god enough to capture home page and hence we can discard this whole script
//Ref: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/chrome_settings_overrides#Browser_compatibility

browser.tabs.onCreated.addListener(handleCreated);

function handleCreated(tab) {

	var querying = browser.tabs.query({currentWindow: true});
	var getting = browser.windows.getAll();

	querying.then((tabs)=>{
		
		var tabLength = tabs.length;

		getting.then((windows)=>{
			
			var windowLength = windows.length;

			if(tabLength == 1 
				&& windowLength == 1
				&& typeof tab.url!="undefined" 
				&& (tab.url=="about:start" || tab.url=="about:blank")){

				var creating = browser.tabs.create({
				    url:"index.html"
				  });
			  	creating.then(onCreated, onError);		
			}	
		}, onError);	

	}, onError);

}

function onCreated(val){}

function onError(err){
	console.log("The Board Error",err);
}
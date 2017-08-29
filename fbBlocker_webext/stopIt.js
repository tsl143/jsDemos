//adding hook to request
browser.webRequest.onBeforeRequest.addListener(
  handleHTTPRequest,
  {urls:["https://facebook.com/*","http://facebook.com/*","https://www.facebook.com/*","http://www.facebook.com/*"]},
  ["blocking"]
);


//function to create notification
function notifyUser(fromTime, toTime){
    browser.notifications.create({
      "type": "basic",
      "iconUrl": "icons/logo_64.png",
      "title": "Facebook Blocked",
      "message": `Facebook has been blocked from ${fromTime} hrs to ${toTime} hrs`
	});
}

//function to create promise and check if we should block the request or not
function handleHTTPRequest(details) {

	let shallNotify = true;
	if(details.originUrl && details.originUrl !== 'undefined')
		shallNotify = false;
	const blockRequest = new Promise((resolve) => {
		gettingItem = browser.storage.local.get('blockHrsTSL'); 
		gettingItem.then((res) => {
		  let fromTime = res.blockHrsTSL.fromHrs || 0;
		  let toTime = res.blockHrsTSL.toHrs || 0;

		  if(fromTime == 0 && toTime == 0)
		  	resolve(false);

		  if(isBlocked(fromTime, toTime)){
		  	if(shallNotify) 
		  		notifyUser(fromTime, toTime);
		  	resolve({ cancel: true });
		  }

		  resolve(false);
		});
	});
	return blockRequest;
}

function isBlocked(fromTime, toTime){

	rightNowDate = new Date();
	rightNow = rightNowDate.getHours() * 60 + rightNowDate.getMinutes();

	if( rightNow >= (fromTime*60) && rightNow <= (toTime*60) )
		return true;
	else
		return false;
}

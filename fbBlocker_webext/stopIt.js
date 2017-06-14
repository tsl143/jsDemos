
// get the time values from browser local storage
var gettingItem = browser.storage.local.get('blockHrsTSL');

// localstorage returns promise
gettingItem.then((res) => {
  fromTime = res.blockHrsTSL.fromHrs || 0;
  toTime = res.blockHrsTSL.toHrs || 0;

  if(fromTime == 0 && toTime == 0)
  	return false;

  if(isBlocked(fromTime, toTime))
  	burnThemAll(fromTime, toTime);
  else
  	return false;

});

//Check if the site should be blocked or not
function isBlocked(fromTime, toTime){

	rightNowDate = new Date();
	rightNow = rightNowDate.getHours() * 60 + rightNowDate.getMinutes();

	if( rightNow >= (fromTime*60) && rightNow <= (toTime*60) )
		return true;
	else
		return false;
}

//remove all body content replace by warning, remove all scripts and stylesheets
function burnThemAll(fromTime, toTime){

	document.body.textContent = "";

	var header = document.createElement('h1');
	header.textContent = `This page has been blocked from ${fromTime}:00 to ${toTime}:00`;
	document.body.appendChild(header);

	var s = document.getElementsByTagName('script');
	var l = document.getElementsByTagName('link');


	for (let i = (s.length-1); i >= 0; i--) {

	        s[i].parentNode.removeChild(s[i]);

	}

	for (let i = (l.length-1); i >= 0; i--) {

	        l[i].parentNode.removeChild(l[i]);

	}

}





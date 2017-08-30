browser.tabs.query({
	active: true,
	currentWindow: true
}, function (tabs) {

	const url = tabs[0].url ;
	let innerText = "<table border='1'>";
	let XHR = new XMLHttpRequest();
	let hexedURL = stringToHex(url);

	XHR.open('GET', `http://plugin.myip.ms/hex_${hexedURL}`, true);
	XHR.send();
	XHR.onreadystatechange = function(){
		try{
			if (XHR.readyState == 4 && XHR.status == 200){
	        	const result = JSON.parse(XHR.responseText);
				console.log(result);
				if(result.domain && result.domain!="")
					innerText += `<tr><td>Domain Name</td><td>${strip(result.domain)}</td></tr>`;
				if(result.ip && result.ip!="")
					innerText += `<tr><td>IP</td><td><a target='_blank' href='http://myip.ms/info/whois/${strip(result.ip)}/'>${strip(result.ip)}</a></td></tr>`;
				if(result.ipv4 && result.ipv4!="")
					innerText += `<tr><td>IPV4</td><td>${processNS(result.ipv4)}</td></tr>`;
				if(result.ipv6 && result.ipv6!="")
					innerText += `<tr><td>IPV6</td><td>${strip(result.ipv6)}</td></tr>`;
				if(result.hosting && result.hosting!="")
					innerText += `<tr><td>Hosted By</td><td>${strip(result.hosting)}</td></tr>`;
				if(result.owners && result.owners!="")
					innerText += `<tr><td>Owners</td><td>${strip(result.owners)}</td></tr>`;
				if(result.countryName && result.countryName!="")
					innerText += `<tr><td>Country</td><td>${strip(result.countryName)}</td></tr>`;
				if(result.host && result.host!="")
					innerText += `<tr><td>Host</td><td>${strip(result.host)}</td></tr>`;
				if(result.ns && result.ns!=""){
					innerText += `<tr><td>NameServers</td><td>${processNS(result.ns)}</td></tr>`;
				}

				document.querySelector('#holder').innerHTML = innerText+"</table>";
	        }	
		}catch(e) {
			document.querySelector('#holder').innerHTML = "Something went Wrong!";
		}
        
    }
});

function strip(html)
{
   var tmp = document.createElement("DIV");
   tmp.innerHTML = html;
   return tmp.textContent || tmp.innerText || "";
}

function processNS(str){
	let NSString = "";
	const dirtyNS = str.split('</li><li>');
	dirtyNS.forEach(eachNS => {NSString += strip(eachNS)+"<br>";});
	return NSString;
}

function stringToHex(s)
{
	s = unescape(encodeURIComponent(s));
	var h = '', a;
	for(var i=0; i<s.length; i++) {
		a = s.charCodeAt(i).toString(16)
		if (a.length == 1) {
			a = '0' + a;
		}
		h += a
	}
	return h ;
}


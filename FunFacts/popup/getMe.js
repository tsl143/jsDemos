/* API CORTESY - http://www.icndb.com/on-your-website/ */

var oReq = new XMLHttpRequest();
oReq.open("GET", "http://api.icndb.com/jokes/random/");
oReq.send();
oReq.onreadystatechange = function()
    {
        if(oReq.readyState == 4)
        {
            var target = document.getElementById("itsAFact");
            if(oReq.status == 200)
            {
                try{
                    target.innerHTML = JSON.parse(oReq.responseText).value.joke;
                }catch(e){
                    target.innerHTML = "Oops, something went wrong :( ";    
                }
                
            }
            else
                target.innerHTML = "Oops, something went wrong :( ";

            target.style="background: #b8b898;";
        }
    };

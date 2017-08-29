function saveOptions(e) {
  e.preventDefault();
  const fromH = document.querySelector("#fromTime").value;
  const toH = document.querySelector("#toTime").value; 
  if(parseInt(fromH) > parseInt(toH)){
    alert('From time cant be greater than to time!');
  }else{
    browser.storage.local.set({blockHrsTSL:{
        fromHrs: fromH,
         toHrs: toH
      }
    });
    alert("Settings Saved");
  }
}

function setForm() {

  var valuesForBox = '';

  for(let i=0; i<=24; i++)
    valuesForBox += `<option value="${i}">${i}</value>`;

  document.querySelector("#fromTime").innerHTML=valuesForBox;
  document.querySelector("#toTime").innerHTML=valuesForBox;

    var gettingItem = browser.storage.local.get('blockHrsTSL');
    gettingItem.then((res) => {
      if(res.blockHrsTSL){
        let fromTime = res.blockHrsTSL.fromHrs || 0;
        let toTime = res.blockHrsTSL.toHrs || 0;
        document.querySelector("#fromTime").value = fromTime;
        document.querySelector("#toTime").value = toTime;        
      }
    });
}

document.addEventListener("DOMContentLoaded", setForm);
document.querySelector("#submit").addEventListener("click", saveOptions);
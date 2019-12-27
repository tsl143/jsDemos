function saveOptions(e) {
  e.preventDefault();
  const fromH = document.querySelector("#fromTime").value;
  const toH = document.querySelector("#toTime").value; 
  browser.storage.local.set({blockHrsTSL:{
      fromHrs: fromH,
        toHrs: toH
    }
  });
  alert("Settings Saved");
}

function setForm() {
  const fromTimeBox = document.querySelector("#fromTime");
  const toTimeBox = document.querySelector("#toTime");
  for(let i=0; i<=24; i++) {
    const o1 = document.createElement('option');
    const o2 = document.createElement('option');
    o1.value = i; o2.value = i;
    o1.textContent = i; o2.textContent = i;
    fromTimeBox.appendChild(o1);
    toTimeBox.appendChild(o2);
  }

    var gettingItem = browser.storage.local.get('blockHrsTSL');
    gettingItem.then((res) => {
      if(res.blockHrsTSL){
        let fromTime = res.blockHrsTSL.fromHrs || 0;
        let toTime = res.blockHrsTSL.toHrs || 0;
        fromTimeBox.value = fromTime;
        toTimeBox.value = toTime;
      }
    });
}

document.addEventListener("DOMContentLoaded", setForm);
document.querySelector("#submit").addEventListener("click", saveOptions);
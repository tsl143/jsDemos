function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({blockHrsTSL:{
      fromHrs: document.querySelector("#fromTime").value,
       toHrs: document.querySelector("#toTime").value
    }
  });

  alert("Settings Saved");
}

function setForm() {

  var valuesForBox = '';

  for(let i=0; i<=24; i++)
    valuesForBox += `<option value="${i}">${i}</value>`;

  document.querySelector("#fromTime").innerHTML=valuesForBox;
  document.querySelector("#toTime").innerHTML=valuesForBox;

    var gettingItem = browser.storage.local.get('blockHrsTSL');
    gettingItem.then((res) => {
      let fromTime = res.blockHrsTSL.fromHrs || 0;
      let toTime = res.blockHrsTSL.toHrs || 0;
      document.querySelector("#fromTime").value = fromTime;
      document.querySelector("#toTime").value = toTime;
    });
}

document.addEventListener("DOMContentLoaded", setForm);
document.querySelector("#submit").addEventListener("click", saveOptions);
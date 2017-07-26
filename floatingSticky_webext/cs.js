var createMemo = (stickyText) => {
  if(document.getElementById('dragme'))
      document.getElementById('dragme').remove();

  var newDiv = document.createElement('textarea');
  newDiv.style.position = 'fixed';
  newDiv.style.top = '10px';
  newDiv.style.display = 'block';
  newDiv.style.zIndex = 9999;
  newDiv.style.right = '10px';
  newDiv.style.height = '150px';
  newDiv.style.width = '250px';
  newDiv.style.background = '#FDF49F';
  newDiv.style.boxShadow = '2px 2px 12px 2px rgb(51, 51, 51)';
  newDiv.style.padding = '10px';
  newDiv.style.border = '0';
  newDiv.style.overflow = 'auto';
  newDiv.style.fontFamily = 'Arial, sans-serif';
  newDiv.style.fontSize = '15px';
  newDiv.style.lineHeight = '1.5';
  newDiv.setAttribute("draggable", true);
  newDiv.setAttribute("id", 'dragme');
  if(stickyText){
    newDiv.value = stickyText;
  }
  function drag_start(event) {
      var style = window.getComputedStyle(event.target, null);
      event.dataTransfer.setData("text/plain",
      (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"),10) - event.clientY));
  } 
  function drag_over(event) { 
      event.preventDefault(); 
      return false; 
  } 
  function drop(event) { 
      var offset = event.dataTransfer.getData("text/plain").split(',');
      var dm = document.getElementById('dragme');
      dm.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
      dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
      event.preventDefault();
      return false;
  } 
  function storeText(e){
    const val = {
      isOpen: true,
      text: this.value
    }
    browser.storage.local.set({ tslStickies: val });
  }
  document.body.appendChild(newDiv);
  newDiv.addEventListener('dragstart',drag_start,false);
  newDiv.addEventListener('keyup',storeText,false); 
  document.body.addEventListener('dragover',drag_over,false); 
  document.body.addEventListener('drop',drop,false); 

};

function init(forceOpen){
  const gettingItem = browser.storage.local.get('tslStickies');

  gettingItem.then((res) => {
    try{
      console.log(res);
      if(res.tslStickies){
        const isOpen = res.tslStickies.isOpen;
        const stickyText = res.tslStickies.text;
        if(isOpen || forceOpen)
          createMemo(stickyText);
      }
    }catch(e){}
  });
}

init(false);

browser.runtime.onMessage.addListener(request=>{
console.log(request);
  switch (request.data){
    case "knockKnock":

      if(document.getElementById('dragme')){
        const val = {
          isOpen: false,
          text: document.getElementById('dragme').value
        }
        browser.storage.local.set({ tslStickies: val });
        document.getElementById('dragme').remove();
      }else{
        init(true);
      }
      break;

    case "iAmBack":
      init();
      break;

    default:
      break;
  }
});



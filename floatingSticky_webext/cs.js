let onText = false;
let onHandle = false;

const createMemo = (stickyObj) => {

  if(document.getElementById('tslfs_DragMe'))
    document.getElementById('tslfs_DragMe').remove();

  const newDiv = document.createElement('div');
  const newText = document.createElement('textarea');
  const newHandle = document.createElement('div');
  const newClose = document.createElement('div');

  newDiv.appendChild(newClose);
  newDiv.appendChild(newHandle);
  newDiv.appendChild(newText);

  newDiv.style.cssText = `position:fixed;
  z-index: 9999;
  height: 200px;
  width: 300px;
  border-radius: 2px;
  overflow: hidden;
  background: #FDF49F;
  left: calc;
  top:10px;
  box-shadow: 2px 2px 12px 2px #999`;

  newHandle.textContent="Drag Me";
  newHandle.style.cssText=`
  background: #74D0EC;
  color: #444;
  line-height: 25px !important;
  font-weight: bold !important;
  text-align:center;
  cursor: pointer;
  font-family: Arial, sans-serif !important;
  font-size: 15px !important;
  `;

  newClose.textContent="X";
  newClose.style.cssText=`
  color: #444;
  position: absolute;
  right: 5px;
  top: 5px;
  font-weight: bold !important;
  cursor: pointer;
  font-family: Arial, sans-serif !important;
  font-size: 15px !important;
  line-height: 15px !important;
  `;

  newText.style.cssText = `
  background: #FDF49F;
  display: block;
  color: #444;
  height: calc(100% - 45px);
  width: calc(100% - 20px);
  padding: 10px;
  border: 0;
  overflow: auto;
  font-family: Arial, sans-serif !important;
  font-size: 15px !important;
  resize: none;
  line-height: 1.5 !important;`;

  newDiv.setAttribute("draggable", true);
  newDiv.setAttribute("id", 'tslfs_DragMe');
  newText.setAttribute("id", 'tslfs_MyText');

  if(stickyObj && (stickyObj.text || stickyObj.left || stickyObj.top)){

    newText.value = stickyObj.text;
    newDiv.style.cssText += `
    left: ${stickyObj.left};
    top: ${stickyObj.top};
    `;

  }else {
    newDiv.style.cssText += `
    right: 10px;
    top: 10px;
    `;
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
      
      const offset = event.dataTransfer.getData("text/plain").split(',');
      newDiv.style.left = (event.clientX + parseInt(offset[0],10)) + 'px';
      newDiv.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
      event.preventDefault();
      setData(true);
      return false;
  }

  function isEnter(event) {
    const id = event.target.getAttribute('id');
    if(id=="tslfs_MyText")
      onText = true;
    if(id=="tslfs_DragMe")
      onHandle = true;
    handleDrag();
  }

  function isLeave(event) {
    const id = event.target.getAttribute('id');
    if(id=="tslfs_MyText")
      onText = false;
    if(id=="tslfs_DragMe")
      onHandle = false;
    handleDrag();
  }

  function handleDrag() {
    if((onHandle && onText))
      newDiv.draggable= false;
    else
      newDiv.draggable= true;
  }

  function closeSticky() {
    setData(false);
    newDiv.remove();
  }

  function saveText() {
    setData(true);
  }

  function setData(isOpen){

    const value = {
      isOpen: isOpen,
      text: newText.value,
      left: newDiv.style.left,
      top: newDiv.style.top,
    };
    browser.storage.local.set({ tslStickies: value });
  }

  document.body.appendChild(newDiv);

  newDiv.addEventListener('dragstart', drag_start, false);
  newDiv.addEventListener('mouseenter', isEnter, false);
  newDiv.addEventListener('mouseleave', isLeave, false);

  newText.addEventListener('keyup',saveText,false);
  newText.addEventListener('mouseenter', isEnter, false);
  newText.addEventListener('mouseleave', isLeave, false);

  newClose.addEventListener('click', closeSticky, false);

  document.body.addEventListener('dragover',drag_over,false); 
  document.body.addEventListener('drop',drop,false); 
  setData(true);
};

function init(forceOpen){
  const gettingItem = browser.storage.local.get('tslStickies');

  gettingItem.then((res) => {
    try{
      if(res.tslStickies){
        const isOpen = res.tslStickies.isOpen;
        if(isOpen || forceOpen)
          createMemo(res.tslStickies);
        else
          document.getElementById('tslfs_DragMe').remove();
      }else if(forceOpen){
        createMemo();
      }
    }catch(e){}
  });
}
browser.runtime.onMessage.addListener(request=>{
  switch (request.data){
    case "knockKnock":
      init(true);
      break;

    case "iAmBack":
      init();
      break;

    default:
      break;
  }
});



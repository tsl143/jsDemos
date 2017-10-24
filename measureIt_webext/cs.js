(function(){
  let x1 = 0;
  let x2 = 0;
  let y1 = 0;
  let y2 = 0;
  let drawIt = false;

  const manipulators = {


    selector: document.createElement('div'),
    upperLabel: document.createElement('span'),
    lowerLabel: document.createElement('span'),
    overlay: document.createElement('div'),

    init: () => {
      manipulators.initializeOverlay();
      manipulators.initializeSelector();
      manipulators.initializeLabels();
    },

    initializeSelector(){
      manipulators.selector.setAttribute("id", 'tslSelector');
      manipulators.selector.style.cssText=`
        background: rgba(255,255,0,0.3);
        border: 1px dashed #444;
        position: absolute;
        z-index: 9999;
      `;
      manipulators.overlay.appendChild(manipulators.selector);
      manipulators.selector.addEventListener('mousedown',manipulators.mDown,false);
      manipulators.selector.addEventListener('mouseup',manipulators.mUp,false);
      manipulators.selector.addEventListener('mousemove',manipulators.mMove,false);
    },

    initializeOverlay: () => {
      manipulators.overlay.setAttribute("id", 'tslOverlay');
      manipulators.overlay.style.cssText=`
        height: 100vh;
        left: 0;
        right: 0;
        top:0;
        position: fixed;
        cursor: crosshair;
        z-index: 9998;
        background: rgba(0,0,0,0.4);
      `;
      document.body.appendChild(manipulators.overlay);

      manipulators.overlay.addEventListener('mousedown',manipulators.mDown,false);
      manipulators.overlay.addEventListener('mouseup',manipulators.mUp,false);
      manipulators.overlay.addEventListener('mousemove',manipulators.mMove,false);
    },

    initializeLabels: () => {
      manipulators.lowerLabel.setAttribute("id", 'tslLowerLabel');
      manipulators.upperLabel.setAttribute("id", 'tslUpperLabel');
      manipulators.lowerLabel.style.cssText=`
        position: absolute;
        bottom: -5px;
        font-size: 12px !important;
        font-family: Arial !important;
        background: #fff;
        left: -33px;
      `;
      manipulators.upperLabel.style.cssText=`
        position: absolute;
        top: -16px;
        font-size: 12px !important;
        font-family: Arial !important;
        background: #fff;
        right: 0;
      `;
      manipulators.selector.appendChild(manipulators.lowerLabel);
      manipulators.selector.appendChild(manipulators.upperLabel);
    },

    destroy: () => {
      manipulators.overlay.remove();
    },

    drawSelector: () => {
      if(!drawIt)
        return false;

      const height = Math.abs(parseInt(y2, 10) - parseInt(y1, 10));
      const width = Math.abs(parseInt(x2, 10) - parseInt(x1, 10));
      let left = x1+"px";
      let top = y1+"px";

      if(x2 < x1)
        left = x2+"px";

      if(y2 < y1)
        top = y2+"px";

      manipulators.selector.style.left=left;
      manipulators.selector.style.top=top;
      manipulators.selector.style.height=height+"px";
      manipulators.selector.style.width=width+"px";

      if(width > 3 && height > 3){
        manipulators.upperLabel.textContent = width+"px";
        manipulators.lowerLabel.textContent = height+"px";  
      }else{
        manipulators.upperLabel.textContent = "";
        manipulators.lowerLabel.textContent = "";    
      }
    },

    mDown: (e) => {
      drawIt = true;
      x1 = e.clientX;
      y1 = e.clientY;
      manipulators.drawSelector();
    },

    mUp: (e) => {
      drawIt = false;
    },

    mMove: (e) => {
      x2 = e.clientX;
      y2 = e.clientY;

      if(drawIt)
        manipulators.drawSelector();
    }
  }

  letsGo = () => {
  	
  	if(document.getElementById('tslOverlay'))
      document.getElementById('tslOverlay').remove();
  	else
  		manipulators.init();

  	document.body.addEventListener('keyup',(e)=>{
  	  if (e.keyCode === 27)
  	    manipulators.destroy();
  	});
  	
  }

  letsGo();
})();
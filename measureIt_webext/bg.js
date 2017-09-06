browser.browserAction.onClicked.addListener(tab=>{
  const sending = browser.tabs.sendMessage(tab.id,{data:'knockKnock'});
});
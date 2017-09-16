const config = {
    target:     'start-date-mtr-datepicker',
    timestamp:  new Date,
    future:     true,
    months: {
      min: 0,
      max: 11,
      step: 1
    },
    minutes: {
      min: 0,
      max: 59,
      step: 1
    },
    years: {
      min: 2017,
      max: 2038,
      step: 1
    }
  };

const domElements = {
  saveReminder: document.getElementById('saveReminder'),
  reminderText: document.getElementById('reminder-text'),
  showReminders: document.getElementById('showReminders'),
  showClock: document.getElementById('showClock'),
  isClock: document.getElementById('isClock'),
  isList: document.getElementById('isList'),
  reminderHolder: document.getElementById('reminderHolder'),
	reminderPlaceholder: document.getElementById('reminderPlaceholder'),
	success: document.getElementById('success')
}
const myDatepicker = new MtrDatepicker(config);

domElements.saveReminder.addEventListener('click', ()=>{

    const when = myDatepicker.getTimestamp()
    const sending = browser.runtime.sendMessage({
        action: "create",
        reminder: domElements.reminderText.value,
        id: 'queIt_'+when,
        when
    });
    domElements.reminderText.value = '';
		domElements.success.className = 'showMe'
		setTimeout(()=>{domElements.success.className = ''},1000)
})
domElements.showReminders.addEventListener('click', ()=>{
  domElements.isClock.className = 'hide'
  domElements.isList.className = ''
  setList()
})

domElements.showClock.addEventListener('click', ()=>{
  domElements.isClock.className = ''
  domElements.isList.className = 'hide'
})

const setList = () => {
  while (domElements.reminderHolder.firstChild) {
    domElements.reminderHolder.removeChild(domElements.reminderHolder.firstChild);
  }
  const gettingItem = browser.storage.local.get('tslReminders'); 
  gettingItem.then((res) => setReminderList(res))
}
const setReminderList = response => {
  const tslReminders = response.tslReminders
  if(!tslReminders)
    return false

  if(Object.keys(tslReminders).length === 0 && tslReminders.constructor === Object) {
    domElements.reminderPlaceholder.className = ''
  }else{
    domElements.reminderPlaceholder.className = 'hide'
    for(let item in  tslReminders) {
      const localTime = parseInt(item.split('_')[1])
      const reminder = document.createElement('div')
      const reminderArrow = document.createElement('span')
      const reminderText = document.createElement('span')
      const reminderDelete = document.createElement('a')
      reminder.className = 'reminder'
      reminder.setAttribute('title', new Date(localTime))
      reminderArrow.textContent = '»'
      reminderText.textContent = tslReminders[item]
      reminderDelete.textContent = '✖'
      reminderDelete.addEventListener('click',() => removeReminder(item,reminder, tslReminders))
      reminder.appendChild(reminderArrow)
      reminder.appendChild(reminderText)
      reminder.appendChild(reminderDelete)
      domElements.reminderHolder.appendChild(reminder)
    }
  }
}

const removeReminder = (item, reminder, tslReminders) => {
  domElements.reminderHolder.removeChild(reminder)
  delete tslReminders[item]
  if(Object.keys(tslReminders).length === 0 && tslReminders.constructor === Object)
    domElements.reminderPlaceholder.className = ''
  browser.storage.local.set({ tslReminders })
  const sending = browser.runtime.sendMessage({
    action: "delete",
    id: item
  });
}
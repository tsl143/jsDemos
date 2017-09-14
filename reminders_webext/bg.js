const setReminder = request => {
    switch (request.action){

        case 'create':
            const when = request.when
            const id = request.id
            const gettingItem = browser.storage.local.get('tslReminders'); 
            gettingItem.then((res) => {
                if (request.action === 'create'){
                    const newReminders = res.tslReminders
                    newReminders[request.id] = request.reminder
                    browser.storage.local.set({ tslReminders: newReminders })
                    createAlarm(when, id)
                }
            }).catch(()=>{
                browser.storage.local.set({ tslReminders: { [id] :  request.reminder } })
                if (request.action === 'create'){
                    createAlarm(when, id)
                }
            })
        break;
        case 'delete':
            browser.alarms.clear(request.id)
        break;
        default:
        break;
    }
}

const createAlarm = (when, id) => {
    browser.alarms.create(
        id,
        {when}
    )
}
browser.runtime.onMessage.addListener(setReminder);

browser.alarms.onAlarm.addListener((alarm) => {
    const gettingItem = browser.storage.local.get('tslReminders'); 
    gettingItem.then((res) => {
        browser.notifications.create( {
            "type": "basic",
            "iconUrl": "icons/logo_64.png",
            "title": "Reminder",
            "message": res.tslReminders[alarm.name] || 'PING'
        });
        const reminders = res.tslReminders
        delete reminders[alarm.name]
        browser.storage.local.set({ tslReminders: reminders })
    })

});

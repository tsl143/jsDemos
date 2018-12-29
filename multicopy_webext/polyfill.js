const isFirefox = typeof browser != 'undefined' ? true : false;
const localStore = {
  get: key => {
    if (isFirefox) {
      return browser.storage.local.get();
    } else {
      return new Promise(resolve => chrome.storage.local.get([key], resolve))
    }
  },
  set: obj => {
    if (isFirefox) {
      return browser.storage.local.set(obj);
    } else {
      return new Promise(resolve => chrome.storage.local.set(obj, resolve))
    }
  }
}

const tabs = {
  query: obj => {
    if (isFirefox) {
      return browser.tabs.query(obj);
    } else {
      return new Promise(resolve => chrome.tabs.query(obj, resolve))
    }
  }
}

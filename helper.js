'use strict';

const TTTAB_URL_ = 'tttab-url-';

const saveTab = (n, callback = () => {}) => {
  getCurrentTab(tab => {
    const key = nToKey(n);
    chrome.storage.local.set({
      [key]: val(tab)
    }, callback)
  });
}

const restoreTab = (n, notifyRequired = true) => {
  const key = nToKey(n);
  chrome.storage.local.get(key, entry => {
    const tab = entry[key];
    if (!tab) {
      if (notifyRequired) notify({text: '!'});
      return
    }
    chrome.tabs.create({url: tab.url});
  });
}

const restoreAllTab = () => {
  [1,2,3,4,5,6,7,8,9,0].forEach(n => restoreTab(n, false));
}

const getSavedTabs = callback => {
  chrome.storage.local.get(null, entries => {
    const tabs = Object.keys(entries).reduce((map, k) => {
      const n = keyToN(k);
      map[n] = {
        n: n,
        title: entries[k].title,
        url: entries[k].url,
        favIconUrl: entries[k].favIconUrl
      }
      return map;
    }, {});
    callback(tabs);
  });
}

const notify = icon => {
  chrome.browserAction.setBadgeBackgroundColor({color: '#51b11d'})
  chrome.browserAction.setBadgeText({text: icon.text})
}

const duplicationTab = () => {
  getCurrentTab(tab => chrome.tabs.create({url: tab.url, active: false}));
}

// private
const getCurrentTab = callback => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => callback(tabs[0]));
}

const val = tab => {
  return {
    title: tab.title,
    url :tab.url,
    favIconUrl: tab.favIconUrl
  }
}

const nToKey = n => {
  return TTTAB_URL_ + n;
}

const keyToN = key => {
  return key.substr(TTTAB_URL_.length);
}

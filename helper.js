'use strict';

const TTTAB_URL_ = 'tttab-url-';

const getCurrentTab = callback => {
  chrome.tabs.query({active: true}, tabs => callback(tabs[0]));
}

const saveTab = (n, tab) => {
  const key = nToKey(n);
  chrome.storage.local.set({
    [key]: val(tab)
  })
}

const restoreTab = n => {
  const key = nToKey(n);
  chrome.storage.local.get(key, entry => {
    const tab = entry[key];
    if (!tab) return notify({text: '!'});
    chrome.tabs.create({url: tab.url});
  });
}

const getSavedTabs = callback => {
  chrome.storage.local.get(null, entries => {
    const tabs = Object.keys(entries).map(k => ({
      n: keyToN(k),
      title: entries[k].title,
      url: entries[k].url,
      favIconUrl: entries[k].favIconUrl,
    }));
    callback(tabs);
  });
}

const notify = icon => {
  getCurrentTab(tab => chrome.browserAction.setBadgeText({text: icon.text}));
}

// private
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

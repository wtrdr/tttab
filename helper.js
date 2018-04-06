'use strict';

const getCurrentTab = callback => {
  chrome.tabs.query({active: true}, tabs => callback(tabs[0]));
}

const saveTab = (key, tab) => {
  chrome.storage.local.set({
    [key]: val(tab)
  })
}

const restoreTab = (key, callback) => {
  chrome.storage.local.get(key, entry => {
    const tab = entry[key];
    if (!tab) return callback(true);
    chrome.tabs.create({url: tab.url})
    callback(false);
  });
}

const getSavedTabs = (callback) => {
  chrome.storage.local.get(null, items=> callback(items));
}

const val = tab => {
  return {
    title: tab.title,
    url :tab.url
  }
}

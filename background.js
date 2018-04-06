'use strict';

// commands
const copyN = n => {
  getCurrentTab(tab => saveTab(nToKey(n), tab));
}

const pasteN = n => {
  restoreTab(nToKey(n), error => error && notify({text: '!'}));
}

const list = () => {
  getSavedTabs(tabs => {
    console.log(convertToArray(tabs));
  });
}

// helpers
const TTTAB_URL_ = 'tttab-url-';

const nToKey = n => {
  return TTTAB_URL_ + n;
}

const keyToN = key => {
  return key.substr(TTTAB_URL_.length);
}

const selectFunction = name => {
  if (name === 'copy-n')  return copyN;
  if (name === 'paste-n') return pasteN;
  if (name === 'list')    return list;
  return () => {}; // nothing to do.
}

const convertToArray = tabs => {
  return Object.keys(tabs).map(k => ({
    n: keyToN(k),
    title: tabs[k].title,
    url: tabs[k].url
  }));
}

const notify = icon => {
  getCurrentTab(tab => chrome.browserAction.setBadgeText({text: icon.text}));
}

const run = (functionName, args) => {
  selectFunction(functionName)(...args);
}

chrome.runtime.onMessage.addListener(({functionName, args, icon}, sender) => {
  notify(icon);
  if (functionName) run(functionName, args);
});

'use strict';

// commands
const recN = n => {
  getCurrentTab(tab => saveTab(n, tab));
}

const playN = n => {
  restoreTab(n);
}

const selectFunction = name => {
  if (name === 'rec-n')  return recN;
  if (name === 'play-n') return playN;
  return () => {}; // nothing to do.
}

const run = (functionName, args) => {
  selectFunction(functionName)(...args);
}

chrome.runtime.onMessage.addListener(({functionName, args, icon}, sender) => {
  notify(icon);
  if (functionName) run(functionName, args);
});

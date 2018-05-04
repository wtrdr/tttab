'use strict';

// commands
const echo = str => {
  notify({text: str})
}

const recN = n => {
  getCurrentTab(tab => saveTab(n, tab));
}

const playN = n => {
  restoreTab(n);
}

const selectFunction = name => {
  if (name === 'echo')   return echo;
  if (name === 'rec-n')  return recN;
  if (name === 'play-n') return playN;
  return () => {}; // nothing to do.
}

const run = (functionName, args) => {
  selectFunction(functionName)(...args);
}

chrome.runtime.onMessage.addListener(({functionName, args, icon}, sender) => {
  if (icon) notify(icon);
  if (functionName) run(functionName, args);
});

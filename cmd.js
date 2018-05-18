'use strict';

// constants
const FUNCTIONS = [
  {name: 'echo',   pattern: /^(t{1,3})$/,    icon: null,           isEnd: false},
  {name: 'play-n', pattern: /^ttt([0-9])$/,  icon: {text: 'good'}, isEnd: true},
  {name: 'rec',    pattern: /^tttr$/,        icon: {text: 'tttr'}, isEnd: false},
  {name: 'rec-n',  pattern: /^tttr([0-9])$/, icon: {text: 'good'}, isEnd: true},
  {name: 'expand', pattern: /^ttte$/,        icon: {text: 'good'}, isEnd: true},
  {name: 'dup',    pattern: /^tttt$/,        icon: {text: 'good'}, isEnd: true},
  {name: null,     pattern: /^ttt.+$/,       icon: {text: '?'},    isEnd: true}
]

// private
const findFunction = current => {
  return FUNCTIONS.find(f => current.match(f.pattern));
}

const args = (func, current) => {
  const matched = current.match(func.pattern);
  if (!matched) return [];
  return matched.slice(1);
}

const createMsg = (f, a, i) => {
  return {functionName: f, args: a, icon: i};
}

const sendToBackground = msg => {
  chrome.runtime.sendMessage(null, msg);
}

const sendIconToBackground = icon => {
  sendToBackground(createMsg(null, null, icon));
}

const send = (func, current) => {
  if(func.name) {
    sendToBackground(createMsg(func.name, args(func, current)));
  }
  if(func.icon) {
    sendIconToBackground(func.icon);
  }
  return func.isEnd;
}

// public
const executable = current => {
  const func = findFunction(current);
  if (!func) return false;
  return true;
}

const exec = current => {
  const func = findFunction(current);
  return send(func, current);
}

const resetNotification = () => {
  sendIconToBackground({text: ''});
}

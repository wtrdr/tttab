'use strict';

// constants
const MASTER_KEY = 't';
const MASTER_CMD = MASTER_KEY + MASTER_KEY + MASTER_KEY;
const FUNCTIONS = [
  {name: 'init',    pattern: /^$/,         icon: {text: 'ttt'},  isEnd: false},

  {name: 'copy',    pattern: /^c$/,        icon: {text: 'tttc'}, isEnd: false},
  {name: 'copy-n',  pattern: /^c([0-9])$/, icon: {text: 'good'}, isEnd: true},

  {name: 'paste',   pattern: /^v$/,        icon: {text: 'tttv'}, isEnd: false},
  {name: 'paste-n', pattern: /^v([0-9])$/, icon: {text: 'good'}, isEnd: true},

  {name: 'list',    pattern: /^l$/,        icon: {text: 'list'}, isEnd: true},
]

// private
const executable = current => {
  return current.startsWith(MASTER_CMD);
}

const acceptable = (current, key) => {
  if (executable(current)) return true;
  if (key === MASTER_KEY) return true;
  return false;
}

const parse = str => {
  return str.substr(MASTER_CMD.length);
}

const findFunction = cmd => {
  return FUNCTIONS.find(f => cmd.match(f.pattern));
}

const createArgs = (cmd, func) => {
  const matched = cmd.match(func.pattern);
  if (!matched) return [];
  return matched.filter(m => m !== cmd);
}

const createMsg = (f, a, i) => {
  return {functionName: f, args: a, icon: i};
}

const sendToBackground = msg => {
  chrome.runtime.sendMessage(null, msg);
}

const sendIconToBackground = text => {
  sendToBackground(createMsg(null, null, {text: text}));
}

const send = (cmd, func) => {
  if (!func) {
    questionNotification();
    return true;
  }
  sendToBackground(createMsg(func.name, createArgs(cmd, func), func.icon));
  return func.isEnd;
}

// public
const exec = current => {
  const cmd = parse(current);
  const func = findFunction(cmd);
  return send(cmd, func);
}

const resetNotification = () => {
  sendIconToBackground('');
}

const questionNotification = () => {
  sendIconToBackground('?');
}

const exclamationNotification = () => {
  sendIconToBackground('!');
}

'use strict';

const MASTER_KEY = 's';
const MASTER_CMD = MASTER_KEY + MASTER_KEY + MASTER_KEY;
const FUNCTIONS = [
  {name: 'init',  pattern: /^$/,         end: false},
  {name: 'copy',  pattern: /^c$/,        end: false},
  {name: 'copyn', pattern: /^c([0-9])$/, end: true},
]

const executable = current => current.startsWith(MASTER_CMD)

const acceptable = (current, key) => {
  if (executable(current)) return true;
  if (key === MASTER_KEY) return true;
  return false;
}
const sendable = (msg) => !!msg.func

const parse = str => str.substr(MASTER_CMD.length)
const find_function = cmd => FUNCTIONS.find(f => cmd.match(f.pattern))
const message = current => {
  const cmd = parse(current);
  const func = find_function(cmd);
  return {func, cmd}
}

const exec = (current) => {
  if (!executable(current)) return false;
  const msg = message(current);
  if (!sendable(msg)) return true; // 送るものがなければそれで終了
  chrome.runtime.sendMessage(null, msg);
  return msg.func.end;
}

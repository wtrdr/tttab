'use strict';

let current = '';
let executed = false;

const ignore = tagName => {
  return ["input", "textarea", "select", "button"].includes(tagName.toLowerCase());
}

const _tttab = current => {
  if (executed) {
    executed = false;
    resetNotification();
  }
  if (!executable(current)) return false;
  if (!exec(current)) return false;
  executed = true;
  return true;
}

const tttab = key => {
  current = acceptable(current, key) ? (current + key) : ''
  if (!_tttab(current)) return;
  current = '';
}

window.addEventListener(
  'keydown', event => {
    if (ignore(event.target.tagName)) return true;
    tttab(event.key);
    return true;
  }
);

'use strict';

let current = '';
let executed = false;

const ignore = tagName => {
  return ["input", "textarea", "select", "button"].includes(tagName.toLowerCase());
}

const reset = () => {
  resetNotification();
  current = '';
  executed = false;
}

const tttab = key => {
  if (executed) reset();
  current = current + key
  if (!executable(current)) return reset();
  if (!exec(current)) return;
  executed = true;
}

window.addEventListener(
  'keydown', event => {
    if (ignore(event.target.tagName)) return true;
    tttab(event.key);
    return true;
  }
);

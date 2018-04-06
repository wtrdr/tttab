'use strict';

let current = '';

const tttab = key => {
  current = acceptable(current, key) ? (current + key) : ''
  if (!executable(current)) return resetNotification();
  if (!exec(current)) return;
  current = '';
  return
}

window.addEventListener(
  'keydown', event => tttab(event.key)
);

'use strict';

let current = '';

const tttab = key => {
  current = acceptable(current, key) ? (current + key) : ''
  if (!executable(current)) return;
  exec(current) && (current = '');
}

window.addEventListener(
  'keydown', event => tttab(event.key)
);

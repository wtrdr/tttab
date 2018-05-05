'use strict';

const ITEM_SEED_NUMBERS = ['1','hr','2','hr','3','hr','4','hr','5','hr','6','hr','7','hr','8','hr','9','hr','0']

const toLink = (templateCommand, tab) => {
  const cloned = templateCommand.cloneNode(true);
  cloned.getElementsByClassName('tabItem__index')[0].innerHTML = tab.n;
  cloned.getElementsByClassName('tabItem__link')[0].href = tab.url;
  cloned.getElementsByClassName('head__favIcon')[0].src = tab.favIconUrl;
  cloned.getElementsByClassName('head__title')[0].innerHTML = tab.title;
  cloned.getElementsByClassName('link__url')[0].innerHTML = tab.url;
  return cloned;
}

const toCommand = (templateCommand, n) => {
  const cloned = templateCommand.cloneNode(true);
  cloned.getElementsByClassName('tabItem__index')[0].innerHTML = n;
  cloned.getElementsByClassName('command')[0].innerHTML = 'ttt' + n;
  return cloned;
}

const findTemplates = () => {
  return {
    link: document.getElementById("templates__link").childNodes[1],
    hr: document.getElementById("templates__hr").childNodes[1],
    command: document.getElementById("templates__command").childNodes[1],
  }
}

const toItem = (templates, tab, n) => {
  if (n === 'hr') return templates.hr.cloneNode(false);
  if (tab) return toLink(templates.link, tab);
  return toCommand(templates.command, n);
}

const toItems = (tabs) => {
  const templates = findTemplates();
  return ITEM_SEED_NUMBERS.map(n => toItem(templates, tabs[n], n));
}

const addTabOpenerByShortcutKey = (tabs) => {
  const validateNumbers = ITEM_SEED_NUMBERS.filter(n => tabs[n]);
  window.addEventListener(
    'keydown', event => {
      const keyStr = event.key + '';
      if (!validateNumbers.includes(keyStr)) return true;
      restoreTab(keyStr);
      return true;
    }
  );
}

getSavedTabs(tabs => {
  const tabList = document.getElementsByClassName("tabList")[0]; 
  toItems(tabs).forEach((item) => tabList.appendChild(item));
  addTabOpenerByShortcutKey(tabs);
});

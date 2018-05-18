'use strict';

const ITEM_SEED_NUMBERS = ['1','hr','2','hr','3','hr','4','hr','5','hr','6','hr','7','hr','8','hr','9','hr','0']
let tabSavedNumbers = [];
let tabUnSavedNumbers = [];

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

const onItemKeyPressed = (event) => {
  const keyStr = event.key + '';
  if (tabSavedNumbers.includes(keyStr)) restoreTab(keyStr);
  if (tabUnSavedNumbers.includes(keyStr)) {
    saveTab(keyStr, () => {
      notify({text: 'good'});
      initialize();
    });
  }
  return true;
}

const addTabOpenerByShortcutKey = (tabs) => {
  const seeds = ITEM_SEED_NUMBERS.filter(n => n !== 'hr');
  tabSavedNumbers = seeds.filter(n => tabs[n]);
  tabUnSavedNumbers = seeds.filter(n => !tabs[n]);
  window.removeEventListener('keydown', onItemKeyPressed);
  window.addEventListener('keydown', onItemKeyPressed);
}

const initialize = () => {
  getSavedTabs(tabs => {
    const tabList = document.getElementsByClassName("tabList")[0]; 
    while (tabList.firstChild) tabList.removeChild(tabList.firstChild); // remove all
    toItems(tabs).forEach((item) => tabList.appendChild(item));
    addTabOpenerByShortcutKey(tabs);
  });
}

initialize();

'use strict';

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

const toItem = (templates, n, tabs) => {
  const tab = tabs[n];
  if (!tab) return toCommand(templates.command, n);
  return toLink(templates.link, tab);
}

getSavedTabs(tabs => {
  const tabList = document.getElementsByClassName("tabList")[0]; 
  const templates = findTemplates();
  ['1','2','3','4','5','6','7','8','9','0'].forEach(n => {
    tabList.appendChild(toItem(templates, n, tabs));
    if (n !== '0') tabList.appendChild(templates.hr.cloneNode(false));
  });
});

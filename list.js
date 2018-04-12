'use strict';

const createImg = tab => {
  const img = document.createElement('img');
  img.setAttribute('src', tab.favIconUrl);
  img.setAttribute('target', '_blank');
  return img;
}

const createSpan = (str, clazz)=> {
  const span = document.createElement('span');
  span.setAttribute('class' ,clazz);
  span.appendChild(document.createTextNode(str));
  return span
}

const createAnchor = tab => {
  const a = document.createElement('a');
  a.setAttribute('href', tab.url);
  a.appendChild(createSpan(tab.title, 'title'));
  a.appendChild(document.createElement('br'));
  a.appendChild(createSpan(tab.url, 'url'));
  return a;
}

const createLi = tab => {
  const li = document.createElement("li"); 
  li.appendChild(createSpan(tab.n, 'n'));
  li.appendChild(createImg(tab));
  li.appendChild(createAnchor(tab));
  return li;
}

getSavedTabs(tabs => {
  var ul = document.createElement("ul"); 
  tabs.sort((a, b) => a.n >= b.n)
  tabs.forEach(tab => ul.appendChild(createLi(tab)));
  document.getElementById("list").appendChild(ul); 
});

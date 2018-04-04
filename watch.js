'use strict';

const MASTER_KEY = 's';
const MASTER_CMD = MASTER_KEY + MASTER_KEY + MASTER_KEY;

class Commander {
  constructor() {
    this.command = '';
  }
  addCommand(c) {
    if (this.acceptable(c)) this.command += c;
    else this.reset();
    return this;
  }
  doIt() {
    if (this.command.length < 4) return;
    if (!this.command.startsWith(MASTER_CMD)) return;
    console.log('do something with: ' + this.command);
    this.reset();
  }
  acceptable(c) {
    if (this.command === MASTER_CMD) return true;
    if (c === MASTER_KEY) return true;
    return false;
  }
  reset() {
    this.command = ''
  }
}

const commander = new Commander();

window.onkeydown = (event) => {
  commander.addCommand(event.key).doIt();
  return true;
}

//chrome.runtime.onInstalled.addListener(function() {
//  chrome.storage.sync.set({color: '#3aa757'}, function() {
//    console.log("The color is green.");
//  });
//  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//    chrome.declarativeContent.onPageChanged.addRules([{
//      conditions: [
//        new chrome.declarativeContent.PageStateMatcher({
//          pageUrl: {hostEquals: 'developer.chrome.com'},
//        })
//      ],
//      actions: [new chrome.declarativeContent.ShowPageAction()]
//    }]);
//  });
//});

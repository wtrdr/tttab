'use strict';

chrome.runtime.onMessage.addListener(function(msg, sender) {
  console.log('msg:', msg);
  console.log('sender:', sender);
  // chrome.tabs.create({url: 'https://yahoo.co.jp'});
});

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

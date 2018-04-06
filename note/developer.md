# (note) How to create Google Chrome Extensions.

## Requirement

- must have `manifest.json` file.
- must have one or more html files.

## Actions

Use **Actions** to call javasctipt or open html when you press the button on the right of the toolbar.
It has two type of actions.

- Browser Actions
- Page Actions

### [Browser Actions](https://developer.chrome.com/extensions/browserAction)

It is a set of settings which worked and persisted in the entire browser.
You can define **browser_action** to manifest.json, like this.

CAUTION: Please consider to use **Page Action** if an icon is not always visible.

### [Page Action](https://developer.chrome.com/extensions/pageAction)

It is a set of settings which worked some (not most) browser pages.

The settings is very similar with **Browser Actions**.
The point of use is which page you want to use it.

## Background

You can create some process which is worked behind of pages.
It has two types.

- Background Page
- Event Page

### [Background Page](https://developer.chrome.com/extensions/background_pages)

> A common need for extensions is to have a single long-running script to manage some task or state. Background pages to the rescue.

CAUTION: Please consider to use **Event Page** if your background process is not required to run all time.

### [Event Page](https://developer.chrome.com/extensions/event_pages)

You can use **Event Page** to run background process just in time.
Event Page is much better for memory usage and other resources.

[ref: event page, best practices](https://developer.chrome.com/extensions/event_pages#best-practices)

Usage: It is very simple, just add `persistent: false` to your background page setting.

```json
"background": {
  "scripts": ["eventPage.js"],
  "persistent": false
},
```

## [Content Script](https://developer.chrome.com/extensions/content_scripts)

You can use **Content Script** to run on the context of the web page which you opened, like change some color by css, add elements by javascript to current web page and so on...

Content Script has some limitation.

> Use `chrome.* APIs`, with the exception of:
> extension (getURL, inIncognitoContext, lastError, onRequest, sendRequest)
> i18n
> runtime (connect, getManifest, getURL, id, onConnect, onMessage, sendMessage)
> storage
> Use variables or functions defined by their extension's pages
> Use variables or functions defined by web pages or by other content scripts

## Refer files

To refer files like images (png, jpg and etc...).

If you use `<img src="images/myimage.png">` tag, you need to put `myimage.png` file under the images dir from app root, which is `manifest.json` be.

(Refer files)[https://developer.chrome.com/extensions/overview#relative-urls]


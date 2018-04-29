# tttab

## What is it?

This is Chrome Extension to controll your tab easily.

## How to use?

1. Type `tttr[0-9]`.  
    Save your favoriate tab.  
    You can see a [tttr] sign on the extension icon when you are on saving mode.
1. Type `ttt[0-9]`.  
    Restore your saved tab on a new window.
    You can see a [ttt] sign on the extensions icon when you are on restoring mode.
1. Press `Ctrl + Shift + T`.  
    You can see a list which has your tabs url.  

## NOTE

- tttab might not work well if you use other extensions which has their own key mappings.  
  Because other key mapping steal keydown event then the event may be suppressed.  
  It depends on their implemetation. Vimium will cause this collision so you need to disable [0-9], [t] and [r] keys.

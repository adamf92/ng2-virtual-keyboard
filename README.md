# af-ng-virtual-keyboard
Open Source project

###### current version v0.0.5 (first working version)
###### not stable until v0.1.0 !

As currently there isn't any good virtual-keyboard for Angular, I decided to make my own one.

### Demo
Coming Soon

### Docs
Coming Soon

### Dependencies
##### Eric Meyer's Reset
[http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/) \
[https://github.com/ianrose/reset-scss](https://github.com/ianrose/reset-scss)
##### Bootstrap breakpoints mixins
[http://getbootstrap.com](http://getbootstrap.com)

# Usage

1. Import AfVirtualKeyboardModule
2. To set theme colors inject AfVirtualKeyboardService to component
and set one of colors: 'blue', 'red', 'green', 'black', 'orange' \
with AfVirtualKeyboardService.setThemeColor(color) method.
3. Attach AfVkToggleDirective ([AfVkToggle]) to any element you want \
ex. `<button afVkToggle>Toggle Keyboard</button>`
4. Attach AfVkInputDirective ([AfVkInput]) to any input element you want \
ex. `<input type="text" afVkInput>`
5. Virtual Keyboard is working with many inputs and inserting values only to \
   focused one. To switch focused input press Tab
6. More actions:
  - set enter or ctrl actions with AfVirtualKeyboardService.setEnterAction(callback) and AfVirtualKeyboardService.setCtrlAction(callback)
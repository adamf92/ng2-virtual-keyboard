# af-ng-virtual-keyboard
Open Source project

###### current version v0.0.3 (RWD + toggle)
###### doesn't work until v0.1.0 !

As currently there isn't any good virtual-keyboard for Angular, I decided to make my own one.
Most(or all) available virtual-keyboard libraries are based on inserting values into inputs.
I have idea to make virtual-keyboard which will be emitting imitations of real keyboard events.

### Dependencies
##### Eric Meyer's Reset
[http://meyerweb.com/eric/tools/css/reset/](http://meyerweb.com/eric/tools/css/reset/) \
[https://github.com/ianrose/reset-scss](https://github.com/ianrose/reset-scss)

# Usage

1. Import AfVirtualKeyboardModule
2. To set theme colors inject AfVirtualKeyboard service to component
and set one of colors: 'blue', 'red', 'green', 'black', 'orange' \
with AfVirtualKeyboard.setThemeColor(color) method.
3. Attach AfVkToggleDirective ([AfVkToggle]) to any element you want \
ex. `<button afVkToggle>Toggle Keyboard</button>`
4. Comming soon!
# ng2-virtual-keyboard
###### current version v0.1.2

Virtual Keyboard for Angular 6

#### NPM
[npm package](https://www.npmjs.com/package/ng2-virtual-keyboard)

### Demo
Coming Soon

### Docs
Coming Soon

# Usage
1. Install package
`npm install ng2-virtual-keyboard`
2. Import Ng2VirtualKeyboardModule
3. To set theme colors inject Ng2VkService to component
and set one of colors: 'blue', 'red', 'green', 'black', 'orange', 'custom \
with Ng2VkService.setThemeColor(color) method. With custom you have to provide \
your own styles with .custom class.
4. Insert `<vk-keyboard></vk-keyboard>` somewhere in view.
5. Attach Toggle Directive - vkToggle to any element you want \
ex. `<button vkToggle>Toggle Keyboard</button>`
6. Attach Input Directive - vkInput to any input element you want \
ex. `<input type="text" afVkInput>` \
or Textarea Directive - vkTextArea to textares \
ex. `<textarea vkTextArea>`
7. Virtual Keyboard is working with many inputs and inserting values only to \
   focused one. To switch focused input press Tab
8. Virtual Keyboard could create selections with shift + arrows
9. To open / close keyboard without vkToggle use toggleKeyboard, openKeyboard and closeKeyboard methods from Ng2VkService
10. Set enter action:
- for all inputs - with setEnterAction(callback) method from Ng2VkService
- for one input - with (vkEnter) output property of vkInput and vkTextArea directives
- action for one input has higher priority
- callback argument and $event object from vkEnter are type of Ng2VkEnterEvent and contain input value and event object
with before / after strings and carret position
- vkTextArea use enter action only with vkEnter, default action is new line

import { Component } from '@angular/core';
import { Ng2VkCustomKeyboardModel, Ng2VkService, Ng2VkEnterEvent, ThemeColors } from 'ng2-virtual-keyboard';

// Example of custom letter keys to register
const customKeys: Ng2VkCustomKeyboardModel = {
  topLine: [
    { lowerCase: 'q', upperCase: 'A' },
    { lowerCase: 'w', upperCase: 'D' },
    { lowerCase: 'e', upperCase: 'A', alter: 'ę', alterUpper: 'Ę' },
    { lowerCase: 'r', upperCase: 'M' },
    { lowerCase: 't', upperCase: '@' },
    { lowerCase: 'y', upperCase: '@' },
    { lowerCase: 'u', upperCase: '@' },
    { lowerCase: 'i', upperCase: '@' },
    { lowerCase: 'o', upperCase: '@', alter: 'ó', alterUpper: 'Ó' },
    { lowerCase: 'p', upperCase: '@' },
  ],
  middleLine: [
    { lowerCase: 'a', upperCase: '@', alter: 'ą', alterUpper : 'Ą' },
    { lowerCase: 's', upperCase: '@', alter: 'ś', alterUpper: 'Ś' },
    { lowerCase: 'd', upperCase: '@' },
    { lowerCase: 'f', upperCase: 'T' },
    { lowerCase: 'g', upperCase: 'O' },
    { lowerCase: 'h', upperCase: '@' },
    { lowerCase: 'j', upperCase: '@' },
    { lowerCase: 'k', upperCase: '@' },
    { lowerCase: 'l', upperCase: '@', alter: 'ł', alterUpper: 'Ł' },
  ],
  bottomLine: [
    { lowerCase: 'z', upperCase: 'M', alter: 'ż', alterUpper: 'Ż' },
    { lowerCase: 'x', upperCase: 'I', alter: 'ź', alterUpper: 'Ź' },
    { lowerCase: 'c', upperCase: 'S', alter: 'ć', alterUpper: 'Ć' },
    { lowerCase: 'v', upperCase: 'T' },
    { lowerCase: 'b', upperCase: 'R' },
    { lowerCase: 'n', upperCase: 'Z', alter: 'ń', alterUpper: 'Ń' },
    { lowerCase: 'm', upperCase: '@' },
  ]
};

@Component({
  selector: 'af-vk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _service: Ng2VkService
  ) {
    _service.setThemeColor('red');
    _service.setEnterAction((event) => console.log('Event from service', event));
  }

  public vkEnter(event: Ng2VkEnterEvent) {
    console.log('Event from output', event);
  }

  public changeTheme(color: ThemeColors) {
    this._service.setThemeColor(color);
  }
}

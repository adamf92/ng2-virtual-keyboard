import { Component, HostListener } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { AfVirtualKeyboardService } from './services/virtual-keyboard.service';
import { ICustomKeyboard } from './models/qwerty-keyboard.model';
import { AfVkEnterEvent } from './models/key-event.model';

// Example of custom letter keys to register
const customKeys: ICustomKeyboard = {
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
    private _service: AfVirtualKeyboardService
  ) {
    _service.setThemeColor('red');
    _service.setEnterAction((event) => console.log('Event from service', event));
  }

  public vkEnter(event: AfVkEnterEvent) {
    console.log('Event from output', event);
  }
}

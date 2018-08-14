import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-caps-lock-key',
  templateUrl: './caps-lock-key.component.html'
})
export class AfVkCapsLockKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: AfVirtualKeyboardService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.capsLockPress();
  }
}

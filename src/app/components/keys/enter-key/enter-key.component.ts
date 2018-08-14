import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-enter-key',
  templateUrl: './enter-key.component.html'
})
export class AfVkEnterKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: AfVirtualKeyboardService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.enterPress();
  }
}

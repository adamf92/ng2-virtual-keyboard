import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';


@Component({
  selector: 'af-vk-shift-key',
  templateUrl: './shift-key.component.html'
})
export class AfVkShiftKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: AfVirtualKeyboardService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.shiftPress();
  }
}

import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-backspace-key',
  templateUrl: './backspace-key.component.html'
})
export class AfVkBackspaceKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: AfVirtualKeyboardService
  ) {
    super(service);
  }
}

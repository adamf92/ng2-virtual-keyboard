import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-space-key',
  templateUrl: './space-key.component.html'
})
export class AfVkSpaceKeyComponent extends AfVkAbstractKeyComponent {


  constructor(
    service: AfVirtualKeyboardService
  ) {
    super(service);
  }

}

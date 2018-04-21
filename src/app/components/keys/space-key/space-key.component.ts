import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-space-key',
  templateUrl: './space-key.component.html'
})
export class AfVkSpaceKeyComponent extends AfVkAbstractKeyComponent {


  constructor(
    settings: AfVirtualKeyboardService
  ) {
    super(settings);
  }

  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }


}

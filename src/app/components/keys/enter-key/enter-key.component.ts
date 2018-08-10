import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-enter-key',
  templateUrl: './enter-key.component.html'
})
export class AfVkEnterKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    settings: AfVirtualKeyboardService
  ) {
    super(settings);
  }

  protected _keypress() {
    this._service.enterPress();
  }

}

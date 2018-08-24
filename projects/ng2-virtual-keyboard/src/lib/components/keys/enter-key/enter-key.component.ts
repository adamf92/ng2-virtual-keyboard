import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-enter-key',
  templateUrl: './enter-key.component.html'
})
export class AfVkEnterKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.enterPress();
  }
}

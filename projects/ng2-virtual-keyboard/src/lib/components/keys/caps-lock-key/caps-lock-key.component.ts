import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-caps-lock-key',
  templateUrl: './caps-lock-key.component.html',
  styleUrls: ['../key.scss']
})
export class AfVkCapsLockKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.capsLockPress();
  }
}

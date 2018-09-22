import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';


@Component({
  selector: 'vk-shift-key',
  templateUrl: './shift-key.component.html',
  styleUrls: ['../key.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfVkShiftKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

  protected _keypress() {
    this._service.shiftPress();
  }
}

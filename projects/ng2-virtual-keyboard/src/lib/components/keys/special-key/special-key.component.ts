import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkKeyEvent } from '../../../models/key-event.model';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-special-key',
  templateUrl: './special-key.component.html',
  styleUrls: ['../key.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfVkSpecialKeyComponent extends AfVkAbstractKeyComponent {
  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

  protected _keypress() {
    switch (this.key) {
      case 'Alt':
        this._service.altPress();
        break;
      case 'tab':
        super._keypress();
        break;
      case '<':
        this._service.arrowPress('left');
        break;
      case '>':
        this._service.arrowPress('right');
        break;
      case '<<':
        this._service._makeSelection('left');
        break;
      case '>>':
        this._service._makeSelection('right');
        break;
    }
  }
}

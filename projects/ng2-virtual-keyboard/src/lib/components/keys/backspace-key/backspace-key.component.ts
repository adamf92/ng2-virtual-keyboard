import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-backspace-key',
  templateUrl: './backspace-key.component.html',
  styleUrls: ['../key.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfVkBackspaceKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }
}

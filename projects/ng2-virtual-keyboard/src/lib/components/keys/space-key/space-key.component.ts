import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-space-key',
  templateUrl: './space-key.component.html',
  styleUrls: ['../key.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfVkSpaceKeyComponent extends AfVkAbstractKeyComponent {


  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

}

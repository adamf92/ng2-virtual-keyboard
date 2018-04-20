import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-space-key',
  templateUrl: './space-key.component.html',
  styleUrls: ['./space-key.component.scss']
})
export class AfVkSpaceKeyComponent extends AfVkAbstractKeyComponent {


  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }

  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }


}

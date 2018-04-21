import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-caps-lock-key',
  templateUrl: './caps-lock-key.component.html'
})
export class AfVkCapsLockKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }
  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }

}

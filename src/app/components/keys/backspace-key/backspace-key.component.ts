import { Component } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-backspace-key',
  templateUrl: './backspace-key.component.html'
})
export class AfVkBackspaceKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }

  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }

}

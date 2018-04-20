import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-enter-key',
  templateUrl: './enter-key.component.html',
  styleUrls: ['./enter-key.component.scss']
})
export class AfVkEnterKeyComponent extends AfVkAbstractKeyComponent {

  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }

  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }

}

import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-shift-key',
  templateUrl: './shift-key.component.html',
  styleUrls: ['./shift-key.component.scss']
})
export class AfVkShiftKeyComponent extends AfVkAbstractKeyComponent {


  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }

    protected _keyboardEvent() {
      return AfVkKeyEvent.shiftEvent();
    }

}

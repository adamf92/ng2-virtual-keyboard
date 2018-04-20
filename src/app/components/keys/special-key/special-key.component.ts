import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVkSettingsService } from '../../../services/settings.service';

@Component({
  selector: 'af-vk-special-key',
  templateUrl: './special-key.component.html',
  styleUrls: ['./special-key.component.scss']
})
export class AfVkSpecialKeyComponent extends AfVkAbstractKeyComponent implements OnInit {

  public keyName = '';

  constructor(
    settings: AfVkSettingsService
  ) {
    super(settings);
  }

  protected _keyboardEvent() {
    return AfVkKeyEvent.shiftEvent();
  }

  ngOnInit() {
    switch (this.key) {
      case 'l-alt':
      case 'r-alt':
        this.keyName = 'alt';
        break;
      case 'l-ctrl':
      case 'r-ctrl':
        this.keyName = 'ctrl';
        break;
      case 'tab':
        this.keyName = 'tab';
        break;
    }
  }

}

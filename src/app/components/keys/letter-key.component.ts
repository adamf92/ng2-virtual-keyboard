import { Component, OnInit, Input } from '@angular/core';
import { AfVkAbstractKeyComponent } from './abstract-key.component';
import { AfVkKeyEvent } from '../../models/key-event.model';
import { AfVkSettingsService } from '../../services/settings.service';

@Component({
    selector: 'af-vk-letter-key',
    templateUrl: 'letter-key.component.html'
})

export class AfVkLetterKeyComponent extends AfVkAbstractKeyComponent {

    constructor(
        settings: AfVkSettingsService
      ) {
        super(settings);
    }

    protected _keyboardEvent() {
         if (this.key) {
             return AfVkKeyEvent.keyboardEvent(this.key);
         }
     }

}

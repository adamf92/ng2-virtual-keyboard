import { Component, OnInit, Input } from '@angular/core';
import { AfVkAbstractKeyComponent } from './abstract-key.component';
import { AfVkKeyEvent } from '../../models/key-event.model';
import { AfVirtualKeyboardService } from '../../services/virtual-keyboard.service';

@Component({
    selector: 'af-vk-letter-key',
    templateUrl: 'letter-key.component.html'
})

export class AfVkLetterKeyComponent extends AfVkAbstractKeyComponent {

    constructor(
        settings: AfVirtualKeyboardService
      ) {
        super(settings);
    }

    protected _keyboardEvent() {
         if (this.key) {
             return AfVkKeyEvent.keyboardEvent(this.key);
         }
     }

}

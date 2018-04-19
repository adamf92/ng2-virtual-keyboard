import { Component, OnInit, Input } from '@angular/core';
import { AfVkAbstractKeyComponent } from './abstract-key.component';
import { AfVkLetterKeyEvent } from '../../models/letter-key.model';

@Component({
    selector: 'af-vk-letter-key',
    templateUrl: 'letter-key.component.html',
    styleUrls: ['letter-key.component.scss']
})

export class AfVkLetterKeyComponent extends AfVkAbstractKeyComponent {

    @Input('key') public key: string;

    protected _keyboardEvent() {
         if (this.key) {
             return AfVkLetterKeyEvent.keyboardEvent(this.key);
         }
     }

}

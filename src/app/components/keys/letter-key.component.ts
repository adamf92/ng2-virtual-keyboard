import { Component, OnInit, Input } from '@angular/core';
import { AfVkAbstractKeyComponent } from './abstract-key.component';
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

}

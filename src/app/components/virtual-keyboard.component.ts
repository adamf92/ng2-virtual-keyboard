import { Component } from '@angular/core';
import { IQwertyKeyboard, QWERTY_KEYBOARD } from '../models/qwerty-keyboard.model';
import { AfVirtualKeyboardService, ThemeColors } from '../services/virtual-keyboard.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'af-virtual-keyboard',
    templateUrl: 'virtual-keyboard.component.html',
    styleUrls: ['virtual-keyboard.component.scss'],
    animations: [
        trigger('vkToggle', [
            state('void', style({ opacity: 0 })),
            state('*', style({ opacity: 1 })),
            transition('void <=> *', animate('600ms ease-in-out'))
        ])
    ]
})
export class AfVirtualKeyboardComponent {

    public themeColor: ThemeColors;

    constructor(
        private _service: AfVirtualKeyboardService
    ) {
        this.themeColor = this._service.getThemeColor();
    }

    public getQwertyKeyboard(): IQwertyKeyboard {
        return this._service.getKeyboardModel();
    }

    public getOpenState() {
        return this._service.getOpenState();
    }

}

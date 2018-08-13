import { Component } from '@angular/core';
import { IQwertyKeyboard, QWERTY_KEYBOARD } from '../models/qwerty-keyboard.model';
import { AfVirtualKeyboardService, ThemeColors } from '../services/virtual-keyboard.service';

@Component({
    selector: 'af-virtual-keyboard',
    templateUrl: 'virtual-keyboard.component.html',
    styleUrls: ['virtual-keyboard.component.scss']
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

    public fadeOut() {
        return this._service.getFadeOut();
    }
}

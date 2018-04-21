import { Component, AfterViewInit } from '@angular/core';
import { IQwertyKeyboard, QWERTY_KEYBOARD } from '../models/qwerty-keyboard.model';
import { AfVirtualKeyboardService, ThemeColors } from '../services/virtual-keyboard.service';

@Component({
    selector: 'af-virtual-keyboard',
    templateUrl: 'virtual-keyboard.component.html',
    styleUrls: ['virtual-keyboard.component.scss']
})

export class AfVirtualKeyboardComponent implements AfterViewInit {

    public themeColor: ThemeColors;

    protected _qwertyKeyboard: IQwertyKeyboard;

    constructor(
        public service: AfVirtualKeyboardService
    ) {
        this.themeColor = service.getThemeColor();
        this._qwertyKeyboard = this._qwertyKeyboard ? this._qwertyKeyboard : QWERTY_KEYBOARD;
    }

    ngAfterViewInit() {}

    public getQwertyKeyboard(): IQwertyKeyboard {
        return this._qwertyKeyboard;
    }

    public getOpenState() {
        return this.service.getOpenState();
    }

    public fadeOut() {
        return this.service.getFadeOut();
    }
}

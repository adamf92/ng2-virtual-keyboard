import { Component, AfterViewInit } from '@angular/core';
import { IQwertyKeyboard, QWERTY_KEYBOARD } from '../models/qwerty-keyboard.model';

@Component({
    selector: 'af-virtual-keyboard',
    templateUrl: 'virtual-keyboard.component.html',
    styleUrls: ['virtual-keyboard.component.scss']
})

export class AfVirtualKeyboardComponent implements AfterViewInit {

    protected _qwertyKeyboard: IQwertyKeyboard;

    constructor() {
        this._qwertyKeyboard = this._qwertyKeyboard ? this._qwertyKeyboard : QWERTY_KEYBOARD;
    }

    ngAfterViewInit() {}

    public getQwertyKeyboard(): IQwertyKeyboard {
        return this._qwertyKeyboard;
    }
}

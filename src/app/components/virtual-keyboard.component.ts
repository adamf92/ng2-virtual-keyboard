import { Component, AfterViewInit } from '@angular/core';
import { IQwertyKeyboard, QWERTY_KEYBOARD } from '../models/qwerty-keyboard.model';
import { AfVkSettingsService, ThemeColors } from '../services/settings.service';

@Component({
    selector: 'af-virtual-keyboard',
    templateUrl: 'virtual-keyboard.component.html',
    styleUrls: ['virtual-keyboard.component.scss']
})

export class AfVirtualKeyboardComponent implements AfterViewInit {

    public themeColor: ThemeColors;

    protected _qwertyKeyboard: IQwertyKeyboard;

    constructor(
        private _settings: AfVkSettingsService
    ) {
        this.themeColor = _settings.getThemeColor();
        this._qwertyKeyboard = this._qwertyKeyboard ? this._qwertyKeyboard : QWERTY_KEYBOARD;
    }

    ngAfterViewInit() {}

    public getQwertyKeyboard(): IQwertyKeyboard {
        return this._qwertyKeyboard;
    }
}

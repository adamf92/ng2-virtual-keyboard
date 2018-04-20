import { Injectable } from '@angular/core';

@Injectable()
export class AfVkSettingsService {

    private _themeColor: ThemeColors;

    constructor() {
        this._themeColor = 'blue';
    }

    public getThemeColor(): ThemeColors {
        return this._themeColor;
    }

    public setThemeColor(color: ThemeColors): void {
        this._themeColor = color;
    }

}

export type ThemeColors = 'blue' | 'red' | 'green' | 'black' | 'orange';

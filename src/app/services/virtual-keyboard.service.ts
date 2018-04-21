import { Injectable } from '@angular/core';

@Injectable()
export class AfVirtualKeyboardService {

    private _themeColor: ThemeColors;
    private _opened: boolean;
    private _fadeOut: boolean;

    constructor() {
        this._themeColor = 'blue';
        this._opened = false;
        this._fadeOut = false;
    }

    public getOpenState(): boolean {
        return this._opened;
    }

    public openKeyboard() {
        this._opened = true;
    }

    public closeKeyboard() {
        this._fadeOut = true;
        setTimeout(() => {
            this._opened = false;
            this._fadeOut = false;
        }, 1800);
    }

    public toggleKeyboard() {
        this._opened ? this.closeKeyboard() : this.openKeyboard();
    }

    public getFadeOut() {
        return this._fadeOut;
    }

    public getThemeColor(): ThemeColors {
        return this._themeColor;
    }

    public setThemeColor(color: ThemeColors): void {
        this._themeColor = color;
    }

}

export type ThemeColors = 'blue' | 'red' | 'green' | 'black' | 'orange';

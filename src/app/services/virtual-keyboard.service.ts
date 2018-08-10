import { Injectable, EventEmitter } from '@angular/core';
import { AfVkKeyEvent } from '../models/key-event.model';
import { IQwertyKey } from '../models/qwerty-keyboard.model';

@Injectable()
export class AfVirtualKeyboardService {

    private _themeColor: ThemeColors;
    private _opened: boolean;
    private _fadeOut: boolean;

    public keyPress$: EventEmitter<AfVkKeyEvent> = new EventEmitter();
    public shift$: EventEmitter<boolean> = new EventEmitter();
    public alt$: EventEmitter<boolean> = new EventEmitter();
    public altShift$: EventEmitter<boolean> = new EventEmitter();

    private _shift: boolean = false;
    private _alt: boolean = false;

    private _position: number = 0;

    constructor() {
        this._themeColor = 'blue';
        this._opened = false;
        this._fadeOut = false;
    }

    // Keypress stream

    public keyPress(key: string) {
        this.keyPress$.emit({ key: key, position: this._position });
    }

    public shiftPress() {
        this._shift = !this._shift;
        if (this._shift) {
            if (this._alt) {
                this.altShift$.emit(true);
            } else {
                this.shift$.emit(true);
            }
        } else {
            if (this._alt) {
                this.alt$.emit(true);
            } else {
                this.shift$.emit(false);
            }
        }
    }

    public altPress() {
        this._alt = !this._alt;
        if (this._alt) {
            if (this._shift) {
                this.altShift$.emit(true);
            } else {
                this.alt$.emit(true);
            }
        } else {
            if (this._shift) {
                this.shift$.emit(true);
            } else {
                this.alt$.emit(false);
            }
        }
    }

    public setPosition(position: number) {
        this._position = position;
    }

    // Open / close

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

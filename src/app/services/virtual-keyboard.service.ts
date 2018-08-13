import { Injectable, EventEmitter } from '@angular/core';
import { AfVkKeyEvent } from '../models/key-event.model';
import { IQwertyKey, IQwertyKeyboard, QWERTY_KEYBOARD, ICustomKeyboard } from '../models/qwerty-keyboard.model';
import { AfVkInputDirectives } from '../directives/abstract-input.directive';

@Injectable()
export class AfVirtualKeyboardService {

    private _themeColor: ThemeColors;
    private _opened: boolean;
    private _fadeOut: boolean;

    private _keyboardModel: IQwertyKeyboard = QWERTY_KEYBOARD;

    public keyPress$: EventEmitter<AfVkKeyEvent> = new EventEmitter();
    public shift$: EventEmitter<boolean> = new EventEmitter();
    public alt$: EventEmitter<boolean> = new EventEmitter();
    public altShift$: EventEmitter<boolean> = new EventEmitter();

    private _shift: boolean = false;
    private _alt: boolean = false;
    private _caps: boolean = false;

    private _position: number = 0;

    private _noTextAreaEnterAction: boolean = true;
    private _enterAction: () => any = () => null;

    constructor() {
        this._themeColor = 'blue';
        this._opened = false;
        this._fadeOut = false;
    }

    // Keypress stream

    public keyPress(key: string) {
        this.keyPress$.emit({ key, position: this._position });
        if (this._shift && !this._caps) {
            this._shift = false;
            if (this._alt) {
                this.alt$.emit(true);
            } else {
                this.shift$.emit(false);
            }
        }
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
            this._caps = false;
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

    public capsLockPress() {
        this._caps = !this._caps;
        this.shiftPress();
    }

    public enterPress() {
        if (this._noTextAreaEnterAction) {
            const active = AfVkInputDirectives.getActiveInput();
            if (active && (active.getInput() instanceof HTMLTextAreaElement)) {
                this.keyPress$.emit({ key: 'enter', position: this._position });
            } else {
                this._enterAction();
            }
        } else {
            this._enterAction();
        }
    }

    public arrowPress(key: 'left' | 'right') {
        this.keyPress$.emit({ key, position: this._position });
    }

    public setEnterAction(action: () => any, noTextArea: boolean = true) {
        this._enterAction = action;
        this._noTextAreaEnterAction = noTextArea;
    }

    public setPosition(position: number) {
        this._position = position;
    }

    public registerKeys(keys: ICustomKeyboard) {
        if (keys.topLine.length !== 10) {
            throw new Error('Top line should have 10 letter keys');
        } else if (keys.middleLine.length !== 9) {
            throw new Error('Middle line should have 9 letter keys');
        } else if (keys.bottomLine.length !== 7) {
            throw new Error('Bottom line should have 7 letter keys');
        }

        const topLine = [];
        topLine.push(this._keyboardModel.topLine.keys[0]);
        topLine.push(...keys.topLine);
        topLine.push(...this._keyboardModel.topLine.keys.slice(11));
        this._keyboardModel.topLine.keys = topLine;

        const middleLine = [];
        middleLine.push(this._keyboardModel.middleLine.keys[0]);
        middleLine.push(...keys.middleLine);
        middleLine.push(...this._keyboardModel.middleLine.keys.slice(10));
        this._keyboardModel.middleLine.keys = middleLine;

        const bottomLine = [];
        bottomLine.push(this._keyboardModel.bottomLine.keys[0]);
        bottomLine.push(...keys.bottomLine);
        bottomLine.push(...this._keyboardModel.bottomLine.keys.slice(8));
        this._keyboardModel.bottomLine.keys = bottomLine;

    }

    public getKeyboardModel() {
        return this._keyboardModel;
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

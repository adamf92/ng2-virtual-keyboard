import { Injectable, EventEmitter } from '@angular/core';
import { Ng2VkEnterEvent } from '../models/key-event.model';
import { IQwertyKey, IQwertyKeyboard, QWERTY_KEYBOARD, Ng2VkCustomKeyboardModel, IQwertyKeysLine } from '../models/qwerty-keyboard.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class Ng2VkService {
    /**
     * Color theme of keyboard
     */
    private _themeColor: ThemeColors = 'blue';
    /**
     * Animation state of keyboard
     */
    private _isAnimating: boolean = false;
    /**
     * Ope state of keyboard
     */
    private _opened: boolean = false;
    /**
     * Model of keyboard keys
     */
    private _keyboardModel: IQwertyKeyboard = QWERTY_KEYBOARD;

    // KEY EVENT STREAMS
    /**
     * Key Press Strem
     *
     * Emitting Ng2VkKeyEvent object into input directives
     */
    public keyPress$: EventEmitter<string> = new EventEmitter();

    public shift: boolean = false;

    public alt: boolean = false;

    public altShift: boolean = false;
    /**
     * Focus Stream
     *
     * Emitting void event to focus active input
     */
    public focus$: EventEmitter<void> = new EventEmitter();
    /**
     * Selection Stream
     *
     * Emitting event with direction of selection
     */
    public selection$: EventEmitter<string> = new EventEmitter();
    /**
     * Color Change Stream
     *
     * Emitting event with new theme color
     */
    public colorChange$: BehaviorSubject<ThemeColors> = new BehaviorSubject(this._themeColor);
    /**
     * Open State Stream
     *
     * Stream responsible for open state of keyboard
     */
    public openState$: BehaviorSubject<boolean> = new BehaviorSubject(false);


    public keyboardModel$: BehaviorSubject<IQwertyKeyboard> = new BehaviorSubject(this._keyboardModel);

    /**
     * Shift
     *
     * Boolean value to check if shift is pressed
     */
    private _shift: boolean = false;
    /**
     * Alt
     *
     * Boolean value to check if alt is pressed
     */
    private _alt: boolean = false;
    /**
     * Caps
     *
     * Boolean value to check if caps lock is pressed
     */
    private _caps: boolean = false;
    /**
     * Position
     *
     * Position of the caret in input
     */
    private _position: number = 0;
    /**
     * Enter Action
     *
     * Callback to be fired after pressing enter. Work on all
     * inputs except textarea or inputs with set vkEnter output
     */
    private _enterAction: (event?: Ng2VkEnterEvent) => any = () => null;
    /**
     * Key Press
     *
     * Emitting keyPress event with keyPress$
     * @param key
     */
    public keyPress(key: string): void {
        this.keyPress$.emit(key);
        if (this.altShift || this.shift) {
            this.altShift = false;
            this.alt = false;
            this._alt = false;
            this.shift = this._caps;
            this._shift = this._caps;

            this.keyboardModel$.next(this._keyboardModel);
        } else if (this.alt) {
            this.altShift = false;
            this.alt = false;
            this._alt = false;
            this.shift = false;
            this._shift = false;
            this.keyboardModel$.next(this._keyboardModel);
        }
    }
    /**
     * Shift Press
     *
     * Changing next letter to upper case
     */
    public shiftPress(): void {
        this._shift = !this._shift;
        if (this._shift) {
            if (this._alt) {
                this.altShift = true;
            } else {
                this.shift = true;
            }
        } else {
            this._caps = false;
            if (this._alt) {
                this.altShift = false;
                this.alt = true;
            } else {
                this.altShift = false;
                this.shift = false;
            }
        }
        this.keyboardModel$.next(this._keyboardModel);
        this.focus$.emit();
    }
    /**
     * Alt Press
     *
     * Changing next letter to alternative value
     */
    public altPress(): void {
        this._alt = !this._alt;
        if (this._alt) {
            if (this._shift) {
                this.altShift = true;
            } else {
                this.alt = true;
            }
        } else {
            if (this._shift) {
                this.altShift = false;
                this.shift = true;
            } else {
                this.altShift = false;
                this.alt = false;
            }
        }
        this.keyboardModel$.next(this._keyboardModel);
        this.focus$.emit();
    }
    /**
     * Caps Lock Press
     *
     * Changing next letters to upper case until caps lock / shift press again
     */
    public capsLockPress(): void {
        this._caps = !this._caps;
        this.shiftPress();
    }
    /**
     * Enter Press
     *
     * Emitting enter press event with keyPress$
     */
    public enterPress(): void {
        this.keyPress$.emit('enter');
    }
    /**
     * Arrow Press
     *
     * Emmitting left or right arrow press with keyPress$.
     * Changing positon of caret in input.
     * @param key
     */
    public arrowPress(key: 'left' | 'right'): void {
        this.keyPress$.emit(key);
    }

    public _makeSelection(key: 'left' | 'right') {
        this.selection$.emit(key);
    }
    /**
     * Set Enter Action
     *
     * Set callback for enter press action
     * @param action
     */
    public setEnterAction(action: (event?: Ng2VkEnterEvent) => any): void {
        this._enterAction = action;
    }
    /**
     * Get Enter Action
     *
     * Returns callback for enter press action
     */
    public getEnterAction(): (event?: Ng2VkEnterEvent) => any {
        return this._enterAction;
    }
    /**
     * Get Open State
     *
     * Get open state of keyboard
     */
    public getOpenState(): Observable<boolean> {
        return this.openState$.asObservable();
    }
    /**
     * Open Keyboard
     *
     * Open keyboard and set animation state
     */
    public openKeyboard(): void {
        this._opened = true;
        this.openState$.next(this._opened);
        this._isAnimating = true;
        setTimeout(() => {
            this._isAnimating = false;
        }, 600);
    }
    /**
     * Close Keyboard
     *
     * Close keyboard and set animation state
     */
    public closeKeyboard(): void {
        this._opened = false;
        this.openState$.next(this._opened);
        this._isAnimating = true;
        setTimeout(() => {
            this._isAnimating = false;
        }, 600);
    }
    /**
     * Toggle keyboard
     *
     * Open/close keyboard
     */
    public toggleKeyboard(): void {
        this._opened ? this.closeKeyboard() : this.openKeyboard();
        if (this._opened) {
            this.focus$.emit();
        }
    }
    /**
     * Is Animating
     *
     * Get animation state of keyboard
     */
    public isAnimating(): boolean {
        return this._isAnimating;
    }
    /**
     * Set Theme Color
     *
     * Set theme color of keyboard
     * @param color
     */
    public setThemeColor(color: ThemeColors): void {
        this._themeColor = color;
        this.colorChange$.next(color);
    }
    /**
     * Register Keys
     *
     * Register custom letter keys
     * @param keys
     */
    public registerKeys(keys: Ng2VkCustomKeyboardModel): void {
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

        this.keyboardModel$.next(this._keyboardModel);
    }
    /**
     * Get Keyboard Model
     */
    public getKeyboardModel(): Observable<IQwertyKeyboard> {
        return this.keyboardModel$.asObservable().pipe(
            map(keyboard => {
                if (this.altShift) {
                    return this._mapKeyboard('altShift', keyboard);
                } else if (this.alt) {
                    return this._mapKeyboard('alt', keyboard);
                } else if (this.shift) {
                    return this._mapKeyboard('shift', keyboard);
                } else {
                    return this._mapKeyboard('normal', keyboard);
                }
            })
        );
    }

    private _mapKeyboard(type: string, keyboard: IQwertyKeyboard): IQwertyKeyboard {
        return {
            numberLine: this._mapLine(type, keyboard.numberLine),
            topLine: this._mapLine(type, keyboard.topLine),
            middleLine: this._mapLine(type, keyboard.middleLine),
            bottomLine: this._mapLine(type, keyboard.bottomLine),
            actionLine: this._mapLine(type, keyboard.actionLine)
        };
    }

    private _mapLine(type: string, line: IQwertyKeysLine): IQwertyKeysLine {
        const keys = line.keys.map(key => this._mapKey(type, key));
        return {
            ...line,
            keys
        };
    }

    private _mapKey(type: string, key: IQwertyKey): IQwertyKey {
        switch (type) {
            case 'altShift':
                return this._altShiftMap(key);
            case 'alt':
                return this._altMap(key);
            case 'shift':
                return this._shiftMap(key);
            default:
                return this._normalMap(key);
        }
    }

    private _altShiftMap(key: IQwertyKey): IQwertyKey {
        const keyModel: IQwertyKey = key;
        if (key.number || key.number === 0) {
            keyModel.viewKey = key.alterUpper ? key.alterUpper :
            (key.upperCase ? key.upperCase : key.number);
        } else if (key.lowerCase) {
            keyModel.viewKey = key.alterUpper ? key.alterUpper :
            (key.upperCase ? key.upperCase : key.lowerCase);
        } else if (key.special) {
            if (key.special.includes('alt')) {
                keyModel.viewKey = 'Alt';
            } else if (key.special.includes('shift')) {
                keyModel.viewKey = 'Shift';
            } else if (key.special === 'left') {
                keyModel.viewKey = '<<';
            } else if (key.special === 'right') {
                keyModel.viewKey = '>>';
            } else {
                keyModel.viewKey = key.special;
            }
        }
        return keyModel;
    }

    private _altMap(key: IQwertyKey): IQwertyKey {
        const keyModel: IQwertyKey = key;
        if (key.number || key.number === 0) {
            keyModel.viewKey = key.alter ? key.alter : key.number;
        } else if (key.lowerCase) {
            keyModel.viewKey = key.alter ? key.alter : key.lowerCase;
        } else if (key.special) {
            if (key.special.includes('alt')) {
                keyModel.viewKey = 'Alt';
            } else if (key.special.includes('shift')) {
                keyModel.viewKey = 'Shift';
            } else if (key.special === 'left') {
                keyModel.viewKey = '<';
            } else if (key.special === 'right') {
                keyModel.viewKey = '>';
            } else {
                keyModel.viewKey = key.special;
            }
        }
        return keyModel;
    }

    private _shiftMap(key: IQwertyKey): IQwertyKey {
        const keyModel: IQwertyKey = key;
        if (key.number || key.number === 0) {
            keyModel.viewKey = key.upperCase ? key.upperCase : key.number;
        } else if (key.lowerCase) {
            keyModel.viewKey = key.upperCase ? key.upperCase : key.lowerCase;
        } else if (key.special) {
            if (key.special.includes('alt')) {
                keyModel.viewKey = 'Alt';
            } else if (key.special.includes('shift')) {
                keyModel.viewKey = 'Shift';
            } else if (key.special === 'left') {
                keyModel.viewKey = '<<';
            } else if (key.special === 'right') {
                keyModel.viewKey = '>>';
            } else {
                keyModel.viewKey = key.special;
            }
        }
        return keyModel;
    }

    private _normalMap(key: IQwertyKey): IQwertyKey {
        const keyModel: IQwertyKey = key;
        if (key.number || key.number === 0) {
            keyModel.viewKey = key.number;
        } else if (key.lowerCase) {
            keyModel.viewKey = key.lowerCase;
        } else if (key.special) {
            if (key.special.includes('alt')) {
                keyModel.viewKey = 'Alt';
            } else if (key.special.includes('shift')) {
                keyModel.viewKey = 'Shift';
            } else if (key.special === 'left') {
                keyModel.viewKey = '<';
            } else if (key.special === 'right') {
                keyModel.viewKey = '>';
            } else {
                keyModel.viewKey = key.special;
            }
        }
        return keyModel;
    }

}

/**
 * Available color themes
 */
export type ThemeColors = 'blue' | 'red' | 'green' | 'black' | 'orange' | 'custom';

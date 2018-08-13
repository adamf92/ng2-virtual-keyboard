import { Injectable, EventEmitter } from '@angular/core';
import { AfVkKeyEvent, AfVkEnterEvent } from '../models/key-event.model';
import { IQwertyKey, IQwertyKeyboard, QWERTY_KEYBOARD, ICustomKeyboard } from '../models/qwerty-keyboard.model';
import { AfVkInputDirectives } from '../directives/abstract-input.directive';

@Injectable()
export class AfVirtualKeyboardService {
    /**
     * Color theme of keyboard
     */
    private _themeColor: ThemeColors = 'blue';
    /**
     * Open state of keyboard
     */
    private _opened: boolean = false;
    /**
     * Animation state of keyboard
     */
    private _isAnimating: boolean = false;
    /**
     * Model of keyboard keys
     */
    private _keyboardModel: IQwertyKeyboard = QWERTY_KEYBOARD;

    // KEY EVENT STREAMS
    /**
     * Key Press Strem
     *
     * Emitting AfVkKeyEvent object into input directives
     */
    public keyPress$: EventEmitter<AfVkKeyEvent> = new EventEmitter();
    /**
     * Shift Stream
     *
     * Emitting boolean value to keys components, to change displayed
     * keys labels to upper or lower case.
     */
    public shift$: EventEmitter<boolean> = new EventEmitter();
    /**
     * Alt Stream
     *
     * Emitting boolean value to keys components, to change displayed
     * keys labels to normal or alternative values.
     */
    public alt$: EventEmitter<boolean> = new EventEmitter();
    /**
     * Alt + Shift Stream
     *
     * Emitting boolean value to keys components, to change displayed
     * keys labels to alternative upper case.
     */
    public altShift$: EventEmitter<boolean> = new EventEmitter();
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
    private _enterAction: (event?: AfVkEnterEvent) => any = () => null;
    /**
     * Key Press
     *
     * Emitting keyPress event with keyPress$
     * @param key
     */
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
    /**
     * Shift Press
     *
     * Changing next letter to upper case
     */
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
    /**
     * Alt Press
     *
     * Changing next letter to alternative value
     */
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
    /**
     * Caps Lock Press
     *
     * Changing next letters to upper case until caps lock / shift press again
     */
    public capsLockPress() {
        this._caps = !this._caps;
        this.shiftPress();
    }
    /**
     * Enter Press
     *
     * Emitting enter press event with keyPress$
     */
    public enterPress() {
        this.keyPress$.emit({ key: 'enter', position: this._position });
    }
    /**
     * Arrow Press
     *
     * Emmitting left or right arrow press with keyPress$.
     * Changing positon of caret in input.
     * @param key
     */
    public arrowPress(key: 'left' | 'right') {
        this.keyPress$.emit({ key, position: this._position });
    }
    /**
     * Set Enter Action
     *
     * Set callback for enter press action
     * @param action
     */
    public setEnterAction(action: (event?: AfVkEnterEvent) => any) {
        this._enterAction = action;
    }
    /**
     * Get Enter Action
     *
     * Returns callback for enter press action
     */
    public getEnterAction(): (event?: AfVkEnterEvent) => any {
        return this._enterAction;
    }
    /**
     * Set Position
     *
     * Save position of caret in input to service on input blur
     * @param position
     */
    public setPosition(position: number) {
        this._position = position;
    }
    /**
     * Get Open State
     *
     * Get open state of keyboard
     */
    public getOpenState(): boolean {
        return this._opened;
    }
    /**
     * Open Keyboard
     *
     * Open keyboard and set animation state
     */
    public openKeyboard() {
        this._opened = true;
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
    public closeKeyboard() {
        this._opened = false;
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
    public toggleKeyboard() {
        this._opened ? this.closeKeyboard() : this.openKeyboard();
    }
    /**
     * Is Animating
     *
     * Get animation state of keyboard
     */
    public isAnimating() {
        return this._isAnimating;
    }
    /**
     * Get Theme Color
     *
     * Get theme color of keyboard
     */
    public getThemeColor(): ThemeColors {
        return this._themeColor;
    }
    /**
     * Set Theme Color
     *
     * Set theme color of keyboard
     * @param color
     */
    public setThemeColor(color: ThemeColors): void {
        this._themeColor = color;
    }
    /**
     * Register Keys
     *
     * Register custom letter keys
     * @param keys
     */
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
    /**
     * Get Keyboard Model
     */
    public getKeyboardModel() {
        return this._keyboardModel;
    }

}

/**
 * Available color themes
 */
export type ThemeColors = 'blue' | 'red' | 'green' | 'black' | 'orange' | 'custom';

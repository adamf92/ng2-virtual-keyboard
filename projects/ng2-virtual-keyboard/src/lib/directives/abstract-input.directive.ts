import { OnDestroy, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { Ng2VkService } from '../services/virtual-keyboard.service';
import { Ng2VkKeyEvent, Ng2VkEnterEvent } from '../models/key-event.model';
import { filter } from 'rxjs/operators';

export abstract class AbstractAfVkInputDirective<T extends HTMLInputElement | HTMLTextAreaElement> implements OnDestroy {

    protected _input: T;
    protected _active: boolean = false;
    protected _position: number;
    protected _selection: { start: number, end: number } = null;
    protected _selectionDirection: 'left' | 'right' = null;

    public id: number;

    @Output('vkEnter') enter$: EventEmitter<Ng2VkEnterEvent> = new EventEmitter();

    constructor(
        protected _el: ElementRef<T>,
        protected _service: Ng2VkService
    ) {
        this._input = this._el.nativeElement;
        this._service.keyPress$.subscribe(event => this._handleKeypress(event));
        this._service.focus$.subscribe(() => this._handleFocus());
        this._service.selection$.subscribe(event => this._makeSelection(event));
        this._registerInput();
    }

    @HostListener('blur') onBlur() {
        this._position = this._input.selectionStart;
        if (this._input.selectionStart === this._input.selectionEnd) {
            this._selection = null;
            this._selectionDirection = null;
        } else {
            this._selection = {
                start: this._input.selectionStart,
                end: this._input.selectionEnd
            };
            this._selectionDirection = this._selectionDirection ? this._selectionDirection : 'left';
        }
    }

    @HostListener('focus') onFocus() {
        AfVkInputDirectives.inputs.forEach(input => input.setActive(false));
        this.setActive(true);
    }

    ngOnDestroy() {
        AfVkInputDirectives.inputs.filter(i => i.id !== this.id);
        AfVkInputDirectives.inputs = AfVkInputDirectives.inputs.map(
            input => {
                if (input.id > this.id) {
                    input.id -= 1;
                }
                return input;
            }
        );
    }

    public setActive(active: boolean): void {
        this._active = active;
    }

    public isActive(): boolean {
        return this._active;
    }

    public getInput(): T {
        return this._input;
    }

    protected _registerInput(): void {
        this.id = AfVkInputDirectives.inputs.length + 1;
        AfVkInputDirectives.inputs.push(this);
    }

    protected _handleFocus(): void {
        if (this._active) {
            this._input.focus();
            if (this._selection) {
                this._input.selectionStart = this._selection.start;
                this._input.selectionEnd = this._selection.end;
            }
        }
    }

    protected _handleKeypress(key: string) {
        if (this._active) {
            let before: string, after: string;
            if (this._selection) {
                before = this._input.value.substring(0, this._selection.start);
                after = this._input.value.substring(this._selection.end);
            } else {
                before = this._input.value.substring(0, this._position);
                after = this._input.value.substring(this._position);
            }

            const helper = { before, after };
            switch (key) {
                case 'backspace':
                    this._handleBackspace(helper);
                    break;
                case 'space':
                    this._handleSpace(helper);
                    break;
                case 'tab':
                    this._handleTab();
                    break;
                case 'left':
                    this._handleLeft();
                    break;
                case 'right':
                    this._handleRight();
                    break;
                case 'enter':
                    this._handleEnter(helper);
                    break;
                default:
                    this._handleLetter(key, helper);
                    break;
            }
        }
    }

    protected _handleBackspace({ before, after }) {
        this._input.focus();
        if (this._input.value.length > 0) {
            if (this._selection) {
                this._input.value = before + after;
                this._setCaret('center');
            } else {
                this._input.value = before.substring(0, before.length - 1) + after;
                this._setCaret(this._position === 0 ? 'center' : 'left');
            }
        }
    }

    protected _handleLetter(key, { before, after }) {
        this._input.focus();
        this._input.value = before + key + after;
        this._setCaret();
    }

    protected _handleSpace({ before, after }) {
        this._input.focus();
        this._input.value = before + ' ' + after;
        this._setCaret();
    }

    protected _handleTab() {
        let next;
        if (AfVkInputDirectives.inputs.findIndex(input => input.id > this.id) !== -1) {
            next = AfVkInputDirectives.inputs.find(input => input.id === this.id + 1);
        } else {
            next = AfVkInputDirectives.inputs.find(input => input.id === 1);
        }
        setTimeout(() => {
            next.getInput().focus();
        }, 0);
    }

    protected _handleLeft() {
        this._input.focus();
        this._setCaret(this._position === 0 ? 'center' : 'left');
    }

    protected _handleRight() {
        this._input.focus();
        this._setCaret();
    }

    protected _handleEnter({ before, after }) {
        const value = this._input.value;
        const event = { before, after, position: this._position };
        if (this.enter$.observers.length > 0) {
            this.enter$.emit({ value, event });
        } else {
            this._service.getEnterAction()({ value, event });
        }
    }

    protected _makeSelection(direction: 'left' | 'right') {
        if (this._active) {
            this._input.focus();
            if (!this._selection) {
                if (direction === 'left') {
                    this._selectionDirection = 'left';
                    this._input.selectionStart = this._position !== 0 ? this._position - 1 : 0;
                    this._input.selectionEnd = this._position;
                } else {
                    this._selectionDirection = 'right';
                    this._input.selectionStart = this._position;
                    this._input.selectionEnd = this._position + 1;
                }
            } else {
                if (direction === 'left') {
                    if (this._selectionDirection === 'left') {
                        this._input.selectionStart = this._selection.start !== 0 ? this._selection.start - 1 : 0;
                        this._input.selectionEnd = this._selection.end;
                    } else {
                        this._input.selectionStart = this._selection.start;
                        this._input.selectionEnd = this._selection.end - 1;
                    }
                } else {
                    if (this._selectionDirection === 'left') {
                        this._input.selectionStart = this._selection.start + 1;
                        this._input.selectionEnd = this._selection.end;
                    } else {
                        this._input.selectionStart = this._selection.start;
                        this._input.selectionEnd = this._selection.end + 1;
                    }
                }
            }
        }
    }

    protected _setCaret(direction: 'left' | 'right' | 'center' = 'right') {
        switch (direction) {
            case 'left':
                this._input.selectionStart = this._position - 1;
                this._input.selectionEnd = this._position - 1;
            break;
            case 'right':
                this._input.selectionStart = this._position + 1;
                this._input.selectionEnd = this._position + 1;
            break;
            case 'center':
                this._input.selectionStart = this._position;
                this._input.selectionEnd = this._position;
            break;
        }
    }
}

export class AfVkInputDirectives {
    public static inputs: AbstractAfVkInputDirective<HTMLInputElement | HTMLTextAreaElement>[] = [];
    public static getActiveInput(): AbstractAfVkInputDirective<HTMLInputElement | HTMLTextAreaElement> {
        if (this.inputs.findIndex(i => i.isActive()) !== -1) {
            return this.inputs.find(i => i.isActive());
        } else {
            return null;
        }
    }
}

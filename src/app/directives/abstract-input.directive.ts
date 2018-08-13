import { OnDestroy, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';
import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';
import { AfVkKeyEvent, AfVkEnterEvent } from '../models/key-event.model';
import { filter } from 'rxjs/operators';

export abstract class AbstractAfVkInputDirective<T extends HTMLInputElement | HTMLTextAreaElement> implements OnDestroy {

    protected _input: T;
    protected _active: boolean = false;

    public id: number;

    @Output('vkEnter') enter$: EventEmitter<AfVkEnterEvent> = new EventEmitter();

    constructor(
        protected _el: ElementRef<T>,
        protected _service: AfVirtualKeyboardService
    ) {
        this._input = this._el.nativeElement;
        this._service.keyPress$
        .subscribe(event => this._handleKeypress(event));
        this._registerInput();
    }

    @HostListener('blur') onBlur() {
        this._service.setPosition(this._input.selectionStart);
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

    public setActive(active: boolean) {
        this._active = active;
    }

    public isActive(): boolean {
        return this._active;
    }

    public getInput(): T {
        return this._input;
    }

    protected _registerInput() {
        this.id = AfVkInputDirectives.inputs.length + 1;
        AfVkInputDirectives.inputs.push(this);
    }

    protected _handleKeypress(event: AfVkKeyEvent) {
        if (this._active) {
            const position = event.position;
            const before = this._input.value.substring(0, position);
            const after = this._input.value.substring(position);

            const helper = { before, after, position };
            switch (event.key) {
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
                    this._handleLeft(position);
                    break;
                case 'right':
                    this._handleRight(position);
                    break;
                case 'enter':
                    this._handleEnter(helper);
                    break;
                default:
                    this._handleLetter(event.key, helper);
                    break;
            }
        }
    }

    protected _handleBackspace({ before, after, position }) {
        this._input.focus();
        if (this._input.value.length > 0) {
            this._input.value = before.substring(0, before.length - 1) + after;
            this._setCaret(position, true);
        }
    }

    protected _handleLetter(key, { before, after, position }) {
        this._input.focus();
        this._input.value = before + key + after;
        this._setCaret(position);
    }

    protected _handleSpace({ before, after, position }) {
        this._input.focus();
        this._input.value = before + ' ' + after;
        this._setCaret(position);
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

    protected _handleLeft(position: number) {
        this._input.focus();
        this._setCaret(position, true);
    }

    protected _handleRight(position: number) {
        this._input.focus();
        this._setCaret(position);
    }

    protected _handleEnter(event: { before: string, after: string, position: number }) {
        const value = this._input.value;
        if (this.enter$.observers.length > 0) {
            this.enter$.emit({ value, event });
        } else {
            this._service.getEnterAction()({ value, event });
        }
    }

    protected _setCaret(position: number, left: boolean = false) {
        if (left) {
            this._input.selectionStart = position - 1;
            this._input.selectionEnd = position - 1;
        } else {
            this._input.selectionStart = position + 1;
            this._input.selectionEnd = position + 1;
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

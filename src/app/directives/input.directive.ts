import { Directive, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';
import { AfVkKeyEvent } from '../models/key-event.model';

@Directive({ selector: '[afVkInput]' })
export class AfVkInputDirective implements OnDestroy {

    private static _inputs: AfVkInputDirective[] = [];

    private _input: HTMLInputElement;
    private _active: boolean = false;

    public id: number;

    constructor(
        private _el: ElementRef,
        private _service: AfVirtualKeyboardService
    ) {
        this._input = <HTMLInputElement> this._el.nativeElement;
        this._service.keyPress$.subscribe(event => this._handleKeypress(event));
        this._registerInput();
    }

    @HostListener('blur') onBlur() {
        this._service.setPosition(this._input.selectionStart);
    }

    @HostListener('focus') onFocus() {
        AfVkInputDirective._inputs.forEach(input => input.setActive(false));
        this.setActive(true);
    }

    ngOnDestroy() {
        AfVkInputDirective._inputs.filter(i => i.id !== this.id);
        AfVkInputDirective._inputs = AfVkInputDirective._inputs.map(
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

    public getInput() {
        return this._input;
    }

    private _registerInput() {
        this.id = AfVkInputDirective._inputs.length + 1;
        AfVkInputDirective._inputs.push(this);
    }

    private _handleKeypress(event: AfVkKeyEvent) {
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
                default:
                    this._handleLetter(event.key, helper);
                    break;
            }
        }
    }

    private _handleBackspace({ before, after, position }) {
        this._input.focus();
        if (this._input.value.length > 0) {
            this._input.value = before.substring(0, before.length - 1) + after;
            this._setCaret(position, true);
        }
    }

    private _handleLetter(key, { before, after, position }) {
        this._input.focus();
        this._input.value = before + key + after;
        this._setCaret(position);
    }

    private _handleSpace({ before, after, position }) {
        this._input.focus();
        this._input.value = before + ' ' + after;
        this._setCaret(position);
    }

    private _handleTab() {
        let next;
        if (AfVkInputDirective._inputs.findIndex(input => input.id > this.id) !== -1) {
            next = AfVkInputDirective._inputs.find(input => input.id === this.id + 1);
        } else {
            next = AfVkInputDirective._inputs.find(input => input.id === 1);
        }
        setTimeout(() => {
            next.getInput().focus();
        }, 0);
    }

    private _setCaret(position: number, backspace: boolean = false) {
        if (backspace) {
            this._input.selectionStart = position - 1;
            this._input.selectionEnd = position - 1;
        } else {
            this._input.selectionStart = position + 1;
            this._input.selectionEnd = position + 1;
        }
    }
}

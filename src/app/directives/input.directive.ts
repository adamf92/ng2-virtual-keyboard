import { Directive, ElementRef, Input, HostListener } from '@angular/core';
import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';
import { AfVkKeyEvent } from '../models/key-event.model';

@Directive({ selector: '[afVkInput]' })
export class AfVkInputDirective {

    private static _inputs: AfVkInputDirective[] = [];

    private _input: HTMLInputElement;
    private _active: boolean = false;

    constructor(
        private _el: ElementRef,
        private _service: AfVirtualKeyboardService
    ) {
        this._input = <HTMLInputElement> this._el.nativeElement;
        this._service.keyPress$.subscribe(event => this.handleKeypress(event));
        AfVkInputDirective._inputs.push(this);
    }

    @HostListener('blur') onBlur() {
        this._service.setPosition(this._input.selectionStart);
    }

    @HostListener('focus') onFocus() {
        AfVkInputDirective._inputs.forEach(input => input.setActive(false));
        this.setActive(true);
    }

    private handleKeypress(event: AfVkKeyEvent) {
        if (this._active) {
            const position = event.position;
            this._input.focus();

            const before = this._input.value.substring(0, position);
            const after = this._input.value.substring(position);

            if (event.key === 'backspace') {
                if (this._input.value.length > 0) {
                    this._input.value = before.substring(0, before.length - 1) + after;
                    this._input.selectionStart = position - 1;
                    this._input.selectionEnd = position - 1;
                }
            } else {
                if (event.key === 'space') {
                    this._input.value = before + ' ' + after;
                } else {
                    this._input.value = before + event.key + after;
                }
                this._input.selectionStart = position + 1;
                this._input.selectionEnd = position + 1;
            }
        }
    }

    public setActive(active: boolean) {
        this._active = active;
    }
}

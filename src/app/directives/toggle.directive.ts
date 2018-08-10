import { Directive, ElementRef, HostListener } from '@angular/core';
import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';

@Directive({ selector: '[afVkToggle]' })
export class AfVkToggleDirective {

    constructor(
        private _el: ElementRef,
        private _service: AfVirtualKeyboardService
    ) {
    }

    @HostListener('click') onclick() {
        this._service.toggleKeyboard();
    }

    @HostListener('document:keydown', ['$event']) keypress(event) {
        if (event.altKey && event.code === 'KeyK') {
            this._service.toggleKeyboard();
        }
    }
}

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
        this._toggleKeyboard();
    }

    private _toggleKeyboard() {
        if (!this._service.isAnimating()) {
            this._service.toggleKeyboard();
        }
    }
}

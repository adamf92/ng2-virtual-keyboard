import { Directive, ElementRef, HostListener } from '@angular/core';
import { Ng2VkService } from '../services/virtual-keyboard.service';

@Directive({ selector: '[vkToggle]' })
export class AfVkToggleDirective {

    constructor(
        private _el: ElementRef,
        private _service: Ng2VkService
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

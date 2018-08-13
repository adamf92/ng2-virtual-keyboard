import { Directive, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { filter } from 'rxjs/operators';

import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';
import { AfVkKeyEvent } from '../models/key-event.model';
import { AbstractAfVkInputDirective } from './abstract-input.directive';

@Directive({ selector: '[afVkTextArea]' })
export class AfVkTextAreaDirective extends AbstractAfVkInputDirective<HTMLTextAreaElement> {

    constructor(
        _el: ElementRef<HTMLTextAreaElement>,
        _service: AfVirtualKeyboardService
    ) {
        super(_el, _service);
    }

    protected _handleEnter(event: { before: string, after: string, position: number }) {
        if (this.enter$.observers.length > 0) {
            this.enter$.emit({ value: this._input.value, event });
        } else {
            this._handleLetter('\r\n', event);
        }
    }
}

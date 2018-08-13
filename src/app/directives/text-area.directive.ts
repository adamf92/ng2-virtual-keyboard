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
        this._service.keyPress$.pipe(
            filter(s => s.key === 'enter')
        ).subscribe(event => {
            this._handleKeypress({ key: '\r\n', position: event.position });
            this._setCaret(event.position);
        });
    }
}

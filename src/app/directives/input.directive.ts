import { Directive, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { AfVirtualKeyboardService } from '../services/virtual-keyboard.service';
import { AfVkKeyEvent } from '../models/key-event.model';
import { AbstractAfVkInputDirective } from './abstract-input.directive';

@Directive({ selector: '[afVkInput]' })
export class AfVkInputDirective extends AbstractAfVkInputDirective<HTMLInputElement> {

    constructor(
        _el: ElementRef<HTMLInputElement>,
        _service: AfVirtualKeyboardService
    ) {
        super(_el, _service);
    }

}

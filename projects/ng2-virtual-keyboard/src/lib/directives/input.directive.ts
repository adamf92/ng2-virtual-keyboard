import { Directive, ElementRef, Input, HostListener, OnDestroy } from '@angular/core';
import { Ng2VkService } from '../services/virtual-keyboard.service';
import { Ng2VkKeyEvent } from '../models/key-event.model';
import { AbstractAfVkInputDirective } from './abstract-input.directive';

@Directive({ selector: '[vkInput]' })
export class AfVkInputDirective extends AbstractAfVkInputDirective<HTMLInputElement> {

    constructor(
        _el: ElementRef<HTMLInputElement>,
        _service: Ng2VkService
    ) {
        super(_el, _service);
    }

}

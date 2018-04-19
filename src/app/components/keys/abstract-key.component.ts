import { VirtualKeyboardOutService } from '../../services/virtual-keyboard-out.service';
import { HostListener } from '@angular/core';

export abstract class AfVkAbstractKeyComponent {

    public abstract key: string;

    constructor(
    ) { }

    @HostListener('click') onClick() {
        let event: KeyboardEvent;
        event = this._keyboardEvent();
        document.dispatchEvent(event);
    }

    protected abstract _keyboardEvent(): KeyboardEvent;
}

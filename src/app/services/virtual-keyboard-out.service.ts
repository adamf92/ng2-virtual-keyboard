import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class VirtualKeyboardOutService {

    constructor() { }

    public emitKeypress(key: string) {
        const emitter: EventEmitter<KeyboardEvent> = new EventEmitter(true);
        const eventInit: KeyboardEventInit = {
            key: key
        };
        const event: KeyboardEvent = new KeyboardEvent('keypress', eventInit);
        document.dispatchEvent(event);
    }
}

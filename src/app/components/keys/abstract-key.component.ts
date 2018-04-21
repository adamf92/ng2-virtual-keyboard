import { HostListener, Input } from '@angular/core';
import { AfVirtualKeyboardService, ThemeColors } from '../../services/virtual-keyboard.service';

export abstract class AfVkAbstractKeyComponent {

    @Input('key') key: string;

    public themeColor: ThemeColors;

    constructor(
        private _settings: AfVirtualKeyboardService
    ) {
        this.themeColor = _settings.getThemeColor();
    }

    @HostListener('click') onClick() {
        let event: Event;
        event = this._keyboardEvent();
        if (event instanceof KeyboardEvent) {
            document.dispatchEvent(event);
        }
    }

    protected abstract _keyboardEvent(): Event;
}

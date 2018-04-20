import { VirtualKeyboardOutService } from '../../services/virtual-keyboard-out.service';
import { HostListener, Input } from '@angular/core';
import { AfVkSettingsService, ThemeColors } from '../../services/settings.service';

export abstract class AfVkAbstractKeyComponent {

    @Input('key') key: string;

    public themeColor: ThemeColors;

    constructor(
        private _settings: AfVkSettingsService
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

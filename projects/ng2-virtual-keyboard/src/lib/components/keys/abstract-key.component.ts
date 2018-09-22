import { HostListener, Input, OnInit } from '@angular/core';
import { Ng2VkService, ThemeColors } from '../../services/virtual-keyboard.service';
import { Observable } from 'rxjs';

export abstract class AfVkAbstractKeyComponent {

    @Input('key') key: string;

    constructor(
        protected _service: Ng2VkService
    ) {}

    @HostListener('click', ['$event']) onClick(event: MouseEvent) {
        this._keypress();
        event.stopPropagation();
    }

    protected _keypress() {
        this._service.keyPress(this.key);
    }

    public getThemeColor(): Observable<ThemeColors> {
        return this._service.colorChange$.asObservable();
    }
}

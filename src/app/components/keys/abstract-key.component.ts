import { HostListener, Input, OnInit } from '@angular/core';
import { AfVirtualKeyboardService, ThemeColors } from '../../services/virtual-keyboard.service';
import { IQwertyKey } from '../../models/qwerty-keyboard.model';

export abstract class AfVkAbstractKeyComponent implements OnInit {

    @Input('key') key: string;

    @Input('keyModel') keyModel: IQwertyKey;

    public viewKey: string;

    public themeColor: ThemeColors;

    constructor(
        protected _service: AfVirtualKeyboardService
    ) {
        this.themeColor = _service.getThemeColor();
    }

    ngOnInit() {
        this.viewKey = this.key;
        // Shift
        this._service.shift$.subscribe(event => {
            if (event) {
                this.viewKey = this.keyModel.upperCase ? this.keyModel.upperCase : this.key;
            } else {
                this.viewKey = this.key;
            }
        });

        this._service.alt$.subscribe(event => {
            if (event) {
                this.viewKey = this.keyModel.alter ? this.keyModel.alter : this.key;
            } else {
                this.viewKey = this.key;
            }
        });

        this._service.altShift$.subscribe(event => {
            if (event) {
                this.viewKey = this.keyModel.alterUpper ? this.keyModel.alterUpper :
                (this.keyModel.upperCase ? this.keyModel.upperCase : this.key);
            } else {
                this.viewKey = this.key;
            }
        });
    }

    @HostListener('click') onClick() {
        this._keypress();
    }

    protected _keypress() {
        this._service.keyPress(this.viewKey);
    }
}

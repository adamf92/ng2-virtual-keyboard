import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { IQwertyKeysLine } from '../models/qwerty-keyboard.model';

@Component({
    selector: 'vk-line',
    templateUrl: 'line.component.html',
    styleUrls: ['line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AfVkLineComponent {

    @Input('line') public line: IQwertyKeysLine;

    public isTabKey(key: string): boolean {
        return key === 'tab';
    }

    public isCapsLockKey(key: string): boolean {
        return key === 'caps-lock';
    }

    public isLShiftKey(key: string): boolean {
        return key === 'l-shift';
    }

    public isRShiftKey(key: string): boolean {
        return key === 'r-shift';
    }

    public isLAltKey(key: string): boolean {
        return key === 'l-alt';
    }

    public isRAltKey(key: string): boolean {
        return key === 'r-alt';
    }

    public isSpaceKey(key: string): boolean {
        return key === 'space';
    }

    public isLeftKey(key: string): boolean {
        return key === 'left';
    }

    public isRightKey(key: string): boolean {
        return key === 'right';
    }

    public isEnterKey(key: string): boolean {
        return key === 'enter';
    }

    public isBackspaceKey(key: string): boolean {
        return key === 'backspace';
    }
}

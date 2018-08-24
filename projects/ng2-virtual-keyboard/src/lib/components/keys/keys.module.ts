import { NgModule } from '@angular/core';

import { AfVkLetterKeyComponent } from './letter-key.component';
import { CommonModule } from '@angular/common';
import { AfVkShiftKeyComponent } from './shift-key/shift-key.component';
import { AfVkSpaceKeyComponent } from './space-key/space-key.component';
import { AfVkEnterKeyComponent } from './enter-key/enter-key.component';
import { AfVkCapsLockKeyComponent } from './caps-lock-key/caps-lock-key.component';
import { AfVkBackspaceKeyComponent } from './backspace-key/backspace-key.component';
import { AfVkSpecialKeyComponent } from './special-key/special-key.component';


@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AfVkLetterKeyComponent,
        AfVkShiftKeyComponent,
        AfVkSpecialKeyComponent,
        AfVkBackspaceKeyComponent,
        AfVkCapsLockKeyComponent,
        AfVkEnterKeyComponent,
        AfVkSpaceKeyComponent
    ],
    declarations: [
        AfVkLetterKeyComponent,
        AfVkShiftKeyComponent,
        AfVkSpecialKeyComponent,
        AfVkBackspaceKeyComponent,
        AfVkCapsLockKeyComponent,
        AfVkEnterKeyComponent,
        AfVkSpaceKeyComponent
],
    providers: [],
})
export class AfVkKeysModule { }

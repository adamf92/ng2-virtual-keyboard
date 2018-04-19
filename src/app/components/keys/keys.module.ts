import { NgModule } from '@angular/core';

import { AfVkLetterKeyComponent } from './letter-key.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AfVkLetterKeyComponent
    ],
    declarations: [
        AfVkLetterKeyComponent,
    ],
    providers: [],
})
export class AfVkKeysModule { }

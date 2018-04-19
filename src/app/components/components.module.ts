import { NgModule } from '@angular/core';
import { AfVirtualKeyboardComponent } from './virtual-keyboard.component';
import { AfVkLineComponent } from './line.component';
import { CommonModule } from '@angular/common';
import { AfVkKeysModule } from './keys/keys.module';

@NgModule({
    imports: [
        CommonModule,
        AfVkKeysModule
    ],
    exports: [
        AfVirtualKeyboardComponent,
        AfVkLineComponent
    ],
    declarations: [
        AfVirtualKeyboardComponent,
        AfVkLineComponent
    ],
    providers: [],
})
export class AfVkComponentModule { }

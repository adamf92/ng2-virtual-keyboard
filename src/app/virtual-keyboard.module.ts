import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AfVkKeysModule } from './components/keys/keys.module';
import { AfVkComponentModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { AfVirtualKeyboardService } from './services/virtual-keyboard.service';
import { AfVkToggleDirective } from './directives/toggle.directive';
import { AfVkInputDirective } from './directives/input.directive';


@NgModule({
    imports: [
        AfVkComponentModule,
        AfVkKeysModule,
        BrowserAnimationsModule,
        CommonModule
    ],
    exports: [
        AfVkComponentModule,
        AfVkKeysModule,
        AfVkToggleDirective,
        AfVkInputDirective
    ],
    declarations: [
        AfVkToggleDirective,
        AfVkInputDirective
    ],
    providers: [
        AfVirtualKeyboardService
    ],
})
export class AfVirtualKeyboardModule { }

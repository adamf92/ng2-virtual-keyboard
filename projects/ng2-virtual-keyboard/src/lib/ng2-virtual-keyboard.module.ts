import { NgModule } from '@angular/core';

import { AfVkKeysModule } from './components/keys/keys.module';
import { AfVkComponentModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { AfVkToggleDirective } from './directives/toggle.directive';
import { AfVkInputDirective } from './directives/input.directive';
import { AfVkTextAreaDirective } from './directives/text-area.directive';


@NgModule({
    imports: [
        AfVkComponentModule,
        AfVkKeysModule,
        CommonModule
    ],
    exports: [
        AfVkComponentModule,
        AfVkKeysModule,
        AfVkToggleDirective,
        AfVkInputDirective,
        AfVkTextAreaDirective
    ],
    declarations: [
        AfVkToggleDirective,
        AfVkInputDirective,
        AfVkTextAreaDirective
    ]
})
export class Ng2VirtualKeyboardModule { }

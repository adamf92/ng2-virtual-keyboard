import { NgModule } from '@angular/core';
import { VirtualKeyboardInService } from './services/virtual-keyboard-in.service';
import { VirtualKeyboardOutService } from './services/virtual-keyboard-out.service';
import { AfVkKeysModule } from './components/keys/keys.module';
import { AfVkComponentModule } from './components/components.module';
import { CommonModule } from '@angular/common';
import { AfVkSettingsService } from './services/settings.service';


@NgModule({
    imports: [
        AfVkComponentModule,
        AfVkKeysModule,
        CommonModule
    ],
    exports: [
        AfVkComponentModule,
        AfVkKeysModule
    ],
    declarations: [],
    providers: [
        VirtualKeyboardInService,
        VirtualKeyboardOutService,
        AfVkSettingsService
    ],
})
export class AfVirtualKeyboardModule { }

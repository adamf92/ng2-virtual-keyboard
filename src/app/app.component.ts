import { Component, HostListener } from '@angular/core';
import { VirtualKeyboardOutService } from './services/virtual-keyboard-out.service';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { AfVkSettingsService } from './services/settings.service';

@Component({
  selector: 'af-vk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public vkService: VirtualKeyboardOutService,
    private _settingsService: AfVkSettingsService
  ) {
    _settingsService.setThemeColor('blue');
  }

  @HostListener('document: keypress', ['$event']) listener(event: KeyboardEvent) {
    console.log(event);
  }

  public clickMe(key: string) {
    this.vkService.emitKeypress(key);
  }

}

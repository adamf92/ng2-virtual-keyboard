import { Component, HostListener } from '@angular/core';
import { EventListener } from '@angular/core/src/debug/debug_node';
import { AfVirtualKeyboardService } from './services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private _settingsService: AfVirtualKeyboardService
  ) {
    _settingsService.setThemeColor('green');
  }

  @HostListener('document: keypress', ['$event']) listener(event: KeyboardEvent) {
    console.log(event);
  }

}

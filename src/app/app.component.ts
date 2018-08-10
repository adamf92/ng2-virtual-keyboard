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
    private _service: AfVirtualKeyboardService
  ) {
    _service.setThemeColor('green');
    _service.setEnterAction(() => _service.closeKeyboard());
  }
}

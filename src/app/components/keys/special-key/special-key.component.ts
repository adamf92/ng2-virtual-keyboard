import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { AfVkKeyEvent } from '../../../models/key-event.model';
import { AfVirtualKeyboardService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'af-vk-special-key',
  templateUrl: './special-key.component.html'
})
export class AfVkSpecialKeyComponent extends AfVkAbstractKeyComponent implements OnInit {

  public keyName = '';

  constructor(
    settings: AfVirtualKeyboardService
  ) {
    super(settings);
  }

  ngOnInit() {
    switch (this.key) {
      case 'l-alt':
      case 'r-alt':
        this.keyName = 'alt';
        break;
      case 'left':
        this.keyName = '<';
        break;
      case 'right':
        this.keyName = '>';
        break;
      case 'tab':
        this.keyName = 'tab';
        break;
    }
    this.viewKey = this.keyName;
  }

  protected _keypress() {
    switch (this.keyName) {
      case 'alt':
        this._service.altPress();
        break;
      case 'tab':
        super._keypress();
        break;
      case '<':
        this._service.arrowPress('left');
        break;
      case '>':
        this._service.arrowPress('right');
        break;
    }
  }
}

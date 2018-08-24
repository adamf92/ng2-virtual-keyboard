import { Component, OnInit } from '@angular/core';
import { AfVkAbstractKeyComponent } from '../abstract-key.component';
import { Ng2VkKeyEvent } from '../../../models/key-event.model';
import { Ng2VkService } from '../../../services/virtual-keyboard.service';

@Component({
  selector: 'vk-special-key',
  templateUrl: './special-key.component.html'
})
export class AfVkSpecialKeyComponent extends AfVkAbstractKeyComponent implements OnInit {

  constructor(
    service: Ng2VkService
  ) {
    super(service);
  }

  ngOnInit() {
    switch (this.key) {
      case 'l-alt':
      case 'r-alt':
        this.viewKey = 'alt';
        break;
      case 'left':
        this.viewKey = '<';
        break;
      case 'right':
        this.viewKey = '>';
        break;
      case 'tab':
        this.viewKey = 'tab';
        break;
    }

    if (this.key === 'left' || this.key === 'right') {
      this._service.shift$.subscribe(shift => {
        if (shift) {
          if (this.viewKey.length === 1) {
            this.viewKey = this.viewKey + this.viewKey;
          }
        } else {
          this.viewKey = this.viewKey[0];
        }
      });
      this._service.alt$.subscribe(() => {
        this.viewKey = this.viewKey[0];
      });
      this._service.altShift$.subscribe(shift => {
        if (shift) {
          if (this.viewKey.length === 1) {
            this.viewKey = this.viewKey + this.viewKey;
          }
        } else {
          this.viewKey = this.viewKey[0];
        }
      });
    }
  }

  protected _keypress() {
    switch (this.viewKey) {
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
      case '<<':
        this._service._makeSelection('left');
        break;
      case '>>':
        this._service._makeSelection('right');
        break;
    }
  }
}

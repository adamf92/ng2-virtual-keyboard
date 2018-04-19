import { Component, AfterViewInit, Input } from '@angular/core';
import { IQwertyKeysLine } from '../models/qwerty-keyboard.model';

@Component({
    selector: 'af-vk-line',
    templateUrl: 'line.component.html',
    styleUrls: ['line.component.scss']
})

export class AfVkLineComponent implements AfterViewInit {

    @Input('line') public line: IQwertyKeysLine;

    constructor() { }

    ngAfterViewInit() { }
}

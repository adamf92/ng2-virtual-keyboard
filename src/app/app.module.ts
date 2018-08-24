import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng2VirtualKeyboardModule } from 'ng2-virtual-keyboard';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2VirtualKeyboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

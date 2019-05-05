import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GeneralService } from './general.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MemoryFormComponent } from './memory-form/memory-form.component';
import { MemoryShowComponent } from './memory-show/memory-show.component';
import { MemoryCardComponent } from './memory-card/memory-card.component';
import { AdressLableComponent } from './adress-label/adress-lable.component'

@NgModule({
  declarations: [
    AppComponent,
    MemoryFormComponent,
    MemoryShowComponent,
    MemoryCardComponent,
    AdressLableComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    GeneralService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

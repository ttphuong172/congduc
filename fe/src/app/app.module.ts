import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NguoinopListComponent } from './nguoinop/nguoinop-list/nguoinop-list.component';
import {HttpClientModule} from "@angular/common/http";
import { NguoinopAddComponent } from './nguoinop/nguoinop-add/nguoinop-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    NguoinopListComponent,
    NguoinopAddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

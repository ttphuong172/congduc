import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NguoinopListComponent } from './nguoinop/nguoinop-list/nguoinop-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NguoinopDeleteComponent } from './nguoinop/nguoinop-delete/nguoinop-delete.component';
import { NguoinopEditComponent } from './nguoinop/nguoinop-edit/nguoinop-edit.component';
import {RouterModule} from "@angular/router";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { SeparatorDirective } from './separator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NguoinopListComponent,
    NguoinopDeleteComponent,
    NguoinopEditComponent,
    SeparatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:"",component:NguoinopListComponent},
      {path:"edit/:id",component:NguoinopEditComponent}
    ]),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

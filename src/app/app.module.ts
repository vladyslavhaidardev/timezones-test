import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimezoneTableComponent } from './components/timezone-table/timezone-table.component';
import { AddTimezoneModalComponent } from './components/add-timezone-modal/add-timezone-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    TimezoneTableComponent,
    AddTimezoneModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

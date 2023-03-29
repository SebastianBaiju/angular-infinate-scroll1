import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule, DragDropModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

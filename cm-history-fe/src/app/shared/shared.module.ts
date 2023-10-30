import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MaterialModule} from "../material/material.module";
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    ToolbarComponent
  ],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }

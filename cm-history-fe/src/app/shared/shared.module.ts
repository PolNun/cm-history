import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    SpinnerComponent
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

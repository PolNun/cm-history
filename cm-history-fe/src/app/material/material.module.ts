import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
  ],
  exports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
  ]
})
export class MaterialModule {
}

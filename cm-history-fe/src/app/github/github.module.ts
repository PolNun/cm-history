import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitCardComponent } from './components/commit-card/commit-card.component';
import {MaterialModule} from "../material/material.module";



@NgModule({
  declarations: [
    CommitCardComponent
  ],
  exports: [
    CommitCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: []
})
export class GithubModule { }

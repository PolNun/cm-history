import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommitCardComponent } from './components/commit-card/commit-card.component';
import {MaterialModule} from "../material/material.module";
import { CommitDetailsDialogComponent } from './components/commit-details-dialog/commit-details-dialog.component';



@NgModule({
  declarations: [
    CommitCardComponent,
    CommitDetailsDialogComponent
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

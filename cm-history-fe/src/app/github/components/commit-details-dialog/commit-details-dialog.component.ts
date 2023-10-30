import {CommitDetail} from "../../interfaces/commit-detail.interface";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";

@Component({
  selector: 'app-commit-details-dialog',
  templateUrl: './commit-details-dialog.component.html',
  styles: [`
      mat-dialog-content {
          max-width: 800px;
          width: 100%;
      }

      .commit-info, .author-info, .committer-info, .file-info {
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
      }

      @media (max-width: 600px) {
          mat-dialog-content {
              max-width: none;
              width: 100%;
          }
      }
  `]
})
export class CommitDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: CommitDetail) {
  }
}

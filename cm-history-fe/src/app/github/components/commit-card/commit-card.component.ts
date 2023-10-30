import {Component, Input} from '@angular/core';
import {GitHubCommit} from "../../interfaces/commit.interface";

@Component({
  selector: 'app-commit-card',
  templateUrl: './commit-card.component.html',
  styleUrls: ['./commit-card.component.css']
})
export class CommitCardComponent {
  @Input() commit!: GitHubCommit;

  viewCommit(url: string) {
    window.open(url, '_blank');
  }
}

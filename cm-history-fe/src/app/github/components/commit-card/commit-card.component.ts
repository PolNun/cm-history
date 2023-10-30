import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GitHubCommit} from "../../interfaces/commit.interface";

@Component({
  selector: 'app-commit-card',
  templateUrl: './commit-card.component.html',
  styleUrls: ['./commit-card.component.css']
})
export class CommitCardComponent {
  @Input() commit!: GitHubCommit;
  @Output() viewDetails = new EventEmitter<void>();

  viewCommit(url: string) {
    window.open(url, '_blank');
  }

  onViewDetailsClick() {
    this.viewDetails.emit();
  }
}

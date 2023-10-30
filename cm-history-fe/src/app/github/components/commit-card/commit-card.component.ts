import {Component} from '@angular/core';
import {GitHubCommit} from "../../interfaces/commit.interface";

@Component({
  selector: 'app-commit-card',
  templateUrl: './commit-card.component.html',
  styleUrls: ['./commit-card.component.css']
})
export class CommitCardComponent {
  fakeCommit: GitHubCommit = {
    "url": "https://github.com/PolNun/git-cm-history/commit/e87caa99aa8acb765b2d758a1f135bd47a74398b",
    "authorName": "Pablo Nunez",
    "authorEmail": "polnunez@outlook.com",
    "date": "2023-10-29T03:41:43Z",
    "message": "Creando servicio para obtener commits"
  };

  viewCommit(url: string) {
    window.open(url, '_blank');
  }
}

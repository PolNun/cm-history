import {Component, OnInit} from '@angular/core';
import {CommitsService} from "./github/services/commits.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private commitsService: CommitsService) {
  }

  ngOnInit(): void {
    this.commitsService.getCommitHistory('polnun', 'git-cm-history', 'main')
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}

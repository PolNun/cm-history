import {Component, OnInit} from '@angular/core';
import {CommitsService} from "./github/services/commits.service";
import {GitHubCommit} from "./github/interfaces/commit.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  commits!: GitHubCommit[];
  branches!: string[];
  selectedBranch!: string;

  constructor(private commitsService: CommitsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadBranches('polnun', 'git-cm-history');
    this.commitsService.getCommitHistory('polnun', 'git-cm-history', 'main')
      .subscribe({
        next: (gitHubCommits) => {
          this.isLoading = false;
          this.commits = gitHubCommits;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  loadBranches(owner: string, repo: string): void {
    this.commitsService.getRepoBranches(owner, repo)
      .subscribe(branches => {
        this.branches = branches;
        if (branches.length > 0) {
          this.selectedBranch = branches[0];
          this.onBranchChange(this.selectedBranch);
        }
      });
  }

  onBranchChange(branch: string): void {
    this.isLoading = true;
    this.commitsService.getCommitHistory('polnun', 'git-cm-history', branch)
      .subscribe({
        next: (gitHubCommits) => {
          this.isLoading = false;
          this.commits = gitHubCommits;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}

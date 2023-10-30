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
  page: number = 1;
  per_page: number = 5;
  private owner: string = 'polnun';
  private repo: string = 'cm-history';

  constructor(private commitsService: CommitsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadBranches(this.owner, this.repo);
    this.commitsService.getCommitHistory(this.owner, this.repo, 'main', this.page, this.per_page)
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

  loadCommits(owner: string, repo: string, branch: string, page: number, per_page: number): void {
    this.commitsService.getCommitHistory(owner, repo, branch, page, per_page)
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
        if (branches.includes('main')) {
          this.selectedBranch = 'main';
          this.onBranchChange(this.selectedBranch);
        } else {
          this.selectedBranch = branches[0];
          this.onBranchChange(this.selectedBranch);
        }
      });
  }

  onBranchChange(branch: string): void {
    this.isLoading = true;
    this.commitsService.getCommitHistory('polnun', 'cm-history', branch, this.page, this.per_page)
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

  onRefreshClick() {
    this.isLoading = true;
    this.loadBranches(this.owner, this.repo);
    this.loadCommits(this.owner, this.repo, this.selectedBranch, this.page, this.per_page);
  }

  onLoadMoreClick() {
    const scrollY = window.scrollY;
    this.isLoading = true;
    this.commitsService.getCommitHistory(this.owner, this.repo, this.selectedBranch, this.page + 1, this.per_page)
      .subscribe({
        next: (gitHubCommits) => {
          this.isLoading = false;
          this.commits = [...this.commits, ...gitHubCommits];
          this.page++;
          window.scrollTo(0, scrollY);
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

}

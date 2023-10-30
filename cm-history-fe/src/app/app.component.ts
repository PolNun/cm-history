import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommitsService} from "./github/services/commits.service";
import {GitHubCommit} from "./github/interfaces/commit.interface";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading = false;
  commits!: GitHubCommit[];
  branches!: string[];
  selectedBranch!: string;
  private owner: string = 'polnun';
  private repo: string = 'cm-history';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private commitsService: CommitsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadBranches(this.owner, this.repo);
    this.commitsService.getCommitHistory(this.owner, this.repo, 'main')
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

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(
        tap(() => this.loadCommits())
      )
      .subscribe();
  }

  loadCommits(): void {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    this.commitsService.getCommitHistory('polnun', 'cm-history', this.selectedBranch, pageIndex, pageSize)
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
    this.commitsService.getCommitHistory('polnun', 'cm-history', branch)
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
    this.loadCommits();
  }

  onScroll() {

  }
}

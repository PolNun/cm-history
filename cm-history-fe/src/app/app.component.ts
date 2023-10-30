import {Component, OnInit} from '@angular/core';
import {CommitsService} from "./github/services/commits.service";
import {GitHubCommit} from "./github/interfaces/commit.interface";
import {MatDialog} from "@angular/material/dialog";
import {CommitDetailsDialogComponent} from "./github/components/commit-details-dialog/commit-details-dialog.component";
import {Owner} from "./github/interfaces/owner.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hasMoreCommits: boolean = true;
  isLoading = false;
  commits!: GitHubCommit[];
  branches!: string[];
  selectedBranch!: string;
  page: number = 1;
  per_page: number = 5;
  private ownerName: string = 'polnun';
  owner!: Owner;
  private repo: string = 'cm-history';

  constructor(private commitsService: CommitsService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadBranches(this.ownerName, this.repo);
    this.loadCommits(this.ownerName, this.repo, 'main', this.page, this.per_page);
    this.commitsService.getOwnerDetails(this.ownerName)
      .subscribe({
        next: (owner) => {
          this.isLoading = false;
          this.owner = owner;
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
        } else {
          this.selectedBranch = branches[0];
        }
        this.onBranchChange(this.selectedBranch);
      });
  }

  onBranchChange(branch: string): void {
    this.isLoading = true;
    this.loadCommits(this.ownerName, this.repo, branch, this.page, this.per_page);
  }

  onRefreshClick() {
    this.isLoading = true;
    this.loadBranches(this.ownerName, this.repo);
    this.loadCommits(this.ownerName, this.repo, this.selectedBranch, this.page, this.per_page);
  }

  onLoadMoreClick() {
    const scrollY = window.scrollY;
    this.isLoading = true;
    this.commitsService.getCommitHistory(this.ownerName, this.repo, this.selectedBranch, ++this.page, this.per_page)
      .subscribe({
        next: (gitHubCommits) => {
          if (gitHubCommits.length === 0) {
            this.hasMoreCommits = false;
          } else {
            window.scrollTo(0, scrollY);
            this.commits.push(...gitHubCommits);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
        }
      });
  }

  openDialog(commitSha: string) {
    this.commitsService.getCommitDetails(this.ownerName, this.repo, commitSha)
      .subscribe(commitDetail => {
        const dialogRef = this.dialog.open(CommitDetailsDialogComponent,
          {data: commitDetail});
      });
  }
}

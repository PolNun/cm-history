import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GitHubCommit} from "../interfaces/commit.interface";
import {CommitDetail} from "../interfaces/commit-detail.interface";
import {Owner} from "../interfaces/owner.interface";

@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  private apiUrl = 'http://localhost:3000/api/github';

  constructor(private http: HttpClient) {
  }

  getCommitHistory(owner: string, repo: string, branch?: string, page?: number, per_page?: number): Observable<GitHubCommit[]> {
    let url = `${this.apiUrl}/${owner}/${repo}`;
    if (branch) {
      url += `?sha=${branch}`;
      if (page) {
        url += `&page=${page}`;
        if (per_page) {
          url += `&per_page=${per_page}`;
        }
      }
    }
    return this.http.get<GitHubCommit[]>(url);
  }

  getRepoBranches(owner: string, repo: string, page?: number, per_page?: number): Observable<string[]> {
    let url = `${this.apiUrl}/${owner}/${repo}/branches`;
    if (page) {
      url += `?page=${page}`;
      if (per_page) {
        url += `&per_page=${per_page}`;
      }
    }
    return this.http.get<string[]>(url);
  }

  getCommitDetails(owner: string, repo: string, sha: string): Observable<CommitDetail> {
    const url = `${this.apiUrl}/${owner}/${repo}/commit/${sha}`;
    return this.http.get<CommitDetail>(url);
  }

  getOwnerDetails(owner: string): Observable<Owner> {
    const url = `${this.apiUrl}/${owner}`;
    return this.http.get<Owner>(url);
  }
}

import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, map} from "rxjs";
import {GitHubCommit, SimplifiedCommit} from "../interfaces/github-commit.interface";
import {CommitDetail} from "../interfaces/commit-detail.interface";
import {OwnerDetail, SimplifiedOwner} from "../interfaces/owner-detail.interface";

@Injectable()
export class GithubService {
    constructor(private readonly configService: ConfigService,
                private readonly httpService: HttpService) {
    }

    getApiUrl(): string {
        return this.configService.get<string>('GITHUB_API_URL');
    }

    async getCommitHistory(owner: string, repo: string): Promise<SimplifiedCommit[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits`;
        const response$ = this.httpService.get<GitHubCommit[]>(url).pipe(
            map(response => response.data.map(this.mapToSimpleCommit)),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('Repository not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching commit history', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    async getCommitsByBranch(owner: string, repo: string, branch: string): Promise<SimplifiedCommit[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits?sha=${branch}`;
        const response$ = this.httpService.get<GitHubCommit[]>(url).pipe(
            map(response => response.data.map(this.mapToSimpleCommit)),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('Repository not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching commit history', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    async getRepoBranches(owner: string, repo: string): Promise<string[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/branches`;
        const response$ = this.httpService.get<any[]>(url).pipe(
            map(response => response.data.map(branch => branch.name)),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('Repository not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching branches', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    async getCommitDetails(owner: string, repo: string, sha: string): Promise<CommitDetail> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits/${sha}`;
        const response$ = this.httpService.get<CommitDetail>(url).pipe(
            map(response => response.data),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('Commit not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching commit details', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    async getOwnerDetails(owner: string): Promise<SimplifiedOwner> {
        const url = `${this.getApiUrl()}/users/${owner}`;
        const response$ = this.httpService.get<OwnerDetail>(url).pipe(
            map(response => this.mapToSimpleOwner(response.data)),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching user details', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    private mapToSimpleOwner(gitHubOwner: OwnerDetail): SimplifiedOwner {
        return {
            url: gitHubOwner.html_url,
            avatarUrl: gitHubOwner.avatar_url,
            name: gitHubOwner.name
        };
    }


    private mapToSimpleCommit(gitHubCommit: GitHubCommit): SimplifiedCommit {
        return {
            url: gitHubCommit.html_url,
            authorName: gitHubCommit.commit.author.name,
            authorEmail: gitHubCommit.commit.author.email,
            date: gitHubCommit.commit.author.date,
            message: gitHubCommit.commit.message
        };
    }
}

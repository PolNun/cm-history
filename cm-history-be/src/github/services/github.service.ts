import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, map} from "rxjs";
import {GitHubCommit} from "../interfaces/github-commit.interface";
import {SimplifiedCommit} from "../interfaces/simplified-commit.interface";

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

    mapToSimpleCommit(gitHubCommit: GitHubCommit): SimplifiedCommit {
        return {
            url: gitHubCommit.html_url,
            authorName: gitHubCommit.commit.author.name,
            authorEmail: gitHubCommit.commit.author.email,
            date: gitHubCommit.commit.author.date,
            message: gitHubCommit.commit.message
        };
    }
}

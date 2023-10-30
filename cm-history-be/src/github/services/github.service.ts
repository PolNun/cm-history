import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {catchError, firstValueFrom, map} from "rxjs";
import {GitHubCommit, SimplifiedCommit} from "../interfaces/github-commit.interface";
import {CommitDetail} from "../interfaces/commit-detail.interface";
import {OwnerDetail, SimplifiedOwner} from "../interfaces/owner-detail.interface";
import {GithubMapper} from "../../core/providers/github-mapper.service";
import {GitHubBranch} from "../interfaces/github-branch.interface";

@Injectable()
export class GithubService {
    constructor(private readonly configService: ConfigService,
                private readonly httpService: HttpService,
                private readonly githubMapper: GithubMapper) {
    }

    getApiUrl(): string {
        return this.configService.get<string>('GITHUB_API_URL');
    }

    async fetchFromGithub<T>(url: string): Promise<T> {
        const response$ = this.httpService.get<T>(url, {
            headers: {
                Authorization: `Bearer ${this.configService.get<string>('GITHUB_TOKEN')}`
            }
        }).pipe(
            map(response => response.data),
            catchError(error => {
                if (error.response && error.response.status === HttpStatus.NOT_FOUND) {
                    throw new HttpException('Not found', HttpStatus.NOT_FOUND);
                } else {
                    throw new HttpException('Error fetching from GitHub', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }),
        );

        return firstValueFrom(response$);
    }

    async getCommitHistory(owner: string, repo: string): Promise<SimplifiedCommit[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits`;
        const commits = await this.fetchFromGithub<GitHubCommit[]>(url);
        return commits.map(this.githubMapper.mapToSimpleCommit);
    }

    async getCommitsByBranch(owner: string, repo: string, branch: string, page = 1, per_page = 30): Promise<SimplifiedCommit[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits?sha=${branch}&page=${page}&per_page=${per_page}`;
        const commits = await this.fetchFromGithub<GitHubCommit[]>(url);
        return commits.map(this.githubMapper.mapToSimpleCommit);
    }

    async getRepoBranches(owner: string, repo: string, page = 1, per_page = 30): Promise<string[]> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/branches?page=${page}&per_page=${per_page}`;
        const branches = await this.fetchFromGithub<GitHubBranch[]>(url);
        return branches.map(branch => branch.name);
    }

    async getCommitDetails(owner: string, repo: string, sha: string): Promise<CommitDetail> {
        const url = `${this.getApiUrl()}/repos/${owner}/${repo}/commits/${sha}`;
        return this.fetchFromGithub<CommitDetail>(url);
    }

    async getOwnerDetails(owner: string): Promise<SimplifiedOwner> {
        const url = `${this.getApiUrl()}/users/${owner}`;
        const ownerDetails = await this.fetchFromGithub<OwnerDetail>(url);
        return this.githubMapper.mapToSimpleOwner(ownerDetails);
    }
}
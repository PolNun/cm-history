import {Controller, Get, Param, Query} from '@nestjs/common';
import {GithubService} from "./services/github.service";
import {CommitDetail} from "./interfaces/commit-detail.interface";
import {SimplifiedOwner} from "./interfaces/owner-detail.interface";
import {SimplifiedCommit} from "./interfaces/github-commit.interface";

@Controller('github')
export class GithubController {
    constructor(private readonly githubService: GithubService) {
    }

    @Get(':owner/:repo')
    getCommitHistory(@Param('owner') owner: string,
                     @Param('repo') repo: string,
                     @Query('sha') branch: string,
                     @Query('page') page: number,
                     @Query('per_page') per_page: number): Promise<SimplifiedCommit[]> {
        return this.githubService.getCommitsByBranch(owner, repo, branch, page, per_page);
    }

    @Get(':owner/:repo/branches')
    getRepoBranches(@Param('owner') owner: string,
                    @Param('repo') repo: string,
                    @Query('page') page: number,
                    @Query('per_page') per_page: number): Promise<string[]> {
        return this.githubService.getRepoBranches(owner, repo, page, per_page);
    }


    @Get(':owner/:repo/commit/:sha')
    getCommitDetails(@Param('owner') owner: string, @Param('repo') repo: string, @Param('sha') sha: string): Promise<CommitDetail> {
        return this.githubService.getCommitDetails(owner, repo, sha);
    }

    @Get(':owner')
    getOwnerDetails(@Param('owner') owner: string): Promise<SimplifiedOwner> {
        return this.githubService.getOwnerDetails(owner);
    }
}

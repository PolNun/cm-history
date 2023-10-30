import {Controller, Get, Param, Query} from '@nestjs/common';
import {GithubService} from "./services/github.service";
import {SimplifiedCommit} from "./interfaces/simplified-commit.interface";

@Controller('commit-history')
export class GithubController {
    constructor(private readonly githubService: GithubService) {
    }

    @Get(':owner/:repo')
    getCommitHistory(@Param('owner') owner: string,
                     @Param('repo') repo: string,
                     @Query('sha') branch: string): Promise<SimplifiedCommit[]> {
        return this.githubService.getCommitsByBranch(owner, repo, branch);
    }

    @Get(':owner/:repo/branches')
    getRepoBranches(@Param('owner') owner: string,
                    @Param('repo') repo: string): Promise<string[]> {
        return this.githubService.getRepoBranches(owner, repo);
    }
}

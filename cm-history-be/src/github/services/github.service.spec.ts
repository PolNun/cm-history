import {Test, TestingModule} from '@nestjs/testing';
import {GithubService} from './github.service';
import {HttpModule, HttpService} from '@nestjs/axios';
import {ConfigService} from '@nestjs/config';
import {of} from 'rxjs';
import {GitHubCommit} from "../interfaces/github-commit.interface";

describe('GithubService', () => {
    let service: GithubService;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [GithubService, ConfigService],
        }).compile();

        service = module.get<GithubService>(GithubService);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should return the commit history', async () => {
        const owner = 'polnun';
        const repo = 'git-cm-history';
        const commitHistory: GitHubCommit[] = [{
            "sha": "a3fb37afea5bca69f4f5852dfdcd58e60171963f",
            "node_id": "C_kwDOKmXwhNoAKGEzZmIzN2FmZWE1YmNhNjlm4YzNDJZGZkY2Q1OGU2MDE3MTk2M2Y",
            "commit": {
                "author": {"name": "Pablo Nunez", "email": "polnunez@outlook.com", "date": "2023-10-28T22:22:57Z"},
                "committer": {"name": "Pablo Nunez", "email": "polnunez@outlook.com", "date": "2023-10-28T22:22:57Z"},
                "message": "Agregando proyecto git-cm-history-backend (NestJS) al repositorio",
                "tree": {
                    "sha": "91dd9fdba943699a1dba9b60a70de395c7d64c50",
                    "url": "https://api.github.com/repos/PolNun/git-cm-history/git/trees/91dd9fdba943699a1dba9b60a70de395c7d64c50"
                },
                "url": "https://api.github.com/repos/PolNun/git-cm-history/git/commits/a3fb37afea5bca69f4f5852dfdcd58e60171963f",
                "comment_count": 0,
                "verification": {"verified": false, "reason": "unsigned", "signature": null, "payload": null}
            },
            "url": "https://api.github.com/repos/PolNun/git-cm-history/commits/a3fb37afea5bca69f4f5852dfdcd58e60171963f",
            "html_url": "https://github.com/PolNun/git-cm-history/commit/a3fb37afea5bca69f4f5852dfdcd58e60171963f",
            "comments_url": "https://api.github.com/repos/PolNun/git-cm-history/commits/a3fb37afea5bca69f4f5852dfdcd58e60171963f",
            "author": {
                "login": "PolNun",
                "id": 89043201,
                "node_id": "MDQ6VXNlcjg5MDQzMjAx",
                "avatar_url": "https://avatars.githubusercontent.com/u/89043201?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/PolNun",
                "html_url": "https://github.com/PolNun",
                "followers_url": "https://api.github.com/users/PolNun/followers",
                "following_url": "https://api.github.com/users/PolNun/following{/other_user}",
                "gists_url": "https://api.github.com/users/PolNun/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/PolNun/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/PolNun/subscriptions",
                "organizations_url": "https://api.github.com/users/PolNun/orgs",
                "repos_url": "https://api.github.com/users/PolNun/repos",
                "events_url": "https://api.github.com/users/PolNun/events{/privacy}",
                "received_events_url": "https://api.github.com/users/PolNun/received_events",
                "type": "User",
                "site_admin": false
            },
            "committer": {
                "login": "PolNun",
                "id": 89043201,
                "node_id": "MDQ6VXNlcjg5MDQzMjAx",
                "avatar_url": "https://avatars.githubusercontent.com/u/89043201?v=4",
                "gravatar_id": "",
                "url": "https://api.github.com/users/PolNun",
                "html_url": "https://github.com/PolNun",
                "followers_url": "https://api.github.com/users/PolNun/followers",
                "following_url": "https://api.github.com/users/PolNun/following{/other_user}",
                "gists_url": "https://api.github.com/users/PolNun/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/PolNun/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/PolNun/subscriptions",
                "organizations_url": "https://api.github.com/users/PolNun/orgs",
                "repos_url": "https://api.github.com/users/PolNun/repos",
                "events_url": "https://api.github.com/users/PolNun/events{/privacy}",
                "received_events_url": "https://api.github.com/users/PolNun/received_events",
                "type": "User",
                "site_admin": false
            },
            "parents": [{
                "sha": "ed1ec5091873d8fb5e337d3c5d2e8cf3cf83e404",
                "url": "https://api.github.com/repos/PolNun/git-cm-history/commits/ed1ec5091873d8fb5e337d3c5d2e8cf3cf83e404",
                "html_url": "https://github.com/PolNun/git-cm-history/commit/ed1ec5091873d8fb5e337d3c5d2e8cf3cf83e404"
            }]
        }];

        jest.spyOn(httpService, 'get').mockImplementation(() => of({data: commitHistory} as any)); // TODO: revisar el any

        expect(await service.getCommitHistory(owner, repo)).toEqual(commitHistory);
    });
});

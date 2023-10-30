import {Injectable} from "@nestjs/common";
import {OwnerDetail, SimplifiedOwner} from "../../github/interfaces/owner-detail.interface";
import {GitHubCommit, SimplifiedCommit} from "../../github/interfaces/github-commit.interface";

@Injectable()
export class GithubMapper {
    mapToSimpleOwner(gitHubOwner: OwnerDetail): SimplifiedOwner {
        return {
            url: gitHubOwner.html_url,
            avatarUrl: gitHubOwner.avatar_url,
            name: gitHubOwner.name
        };
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

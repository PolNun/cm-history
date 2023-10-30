import {Module} from '@nestjs/common';
import {GithubMapper} from "./providers/github-mapper.service";

@Module({
    providers: [
        GithubMapper
    ],
    exports: [
        GithubMapper
    ]
})
export class CoreModule {
}

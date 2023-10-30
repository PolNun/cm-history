import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {GithubController} from "./github.controller";
import {GithubService} from "./services/github.service";

@Module({
    imports: [
        ConfigModule,
        HttpModule
    ],
    controllers: [
        GithubController
    ],
    providers: [
        GithubService
    ]
})
export class GithubModule {
}

import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {HttpModule} from "@nestjs/axios";
import {GithubController} from "./github.controller";
import {GithubService} from "./services/github.service";
import {CoreModule} from "../core/core.module";

@Module({
    imports: [
        ConfigModule,
        HttpModule,
        CoreModule
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

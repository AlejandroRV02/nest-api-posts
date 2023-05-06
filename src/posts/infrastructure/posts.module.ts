import { Module } from "@nestjs/common";
import { PostsController } from "./controllers/posts.controller";
import { IPostsService } from "../application/posts.service.interface";
import { PostsService } from "../application/posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../domain/post.entity";
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { IPostsSeeder } from "./seeder/IPostsSeeder";
import { PostsSeeder } from "./seeder/PostsSeeder";
import { IPostsAPIConsumer } from "./http/IPostsAPIConsumer";
import { PostsAPIConsumer } from "./http/PostsAPIConsumer";
import { AuthModule } from "src/auth/infrastructure/auth.module";

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forFeature([Post]),
		HttpModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				baseURL: configService.get('JSON_PLACEHOLDER_API_URL') + 'posts/'
			}),
		}),
	],
	controllers: [PostsController],
	providers: [
		{
			provide: IPostsService,
			useClass: PostsService
		},
		{
			provide: IPostsSeeder,
			useClass: PostsSeeder
		},
		{
			provide: IPostsAPIConsumer,
			useClass: PostsAPIConsumer
		},
	],
	exports: [
		{
			provide: IPostsSeeder,
			useClass: PostsSeeder
		}
	]
})
export class PostsModule { }
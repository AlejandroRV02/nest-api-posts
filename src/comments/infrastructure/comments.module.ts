import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ICommentsService } from '../application/comments.service.interface';
import { CommentsService } from '../application/coments.service';
import { CommentsController } from './controllers/comments.controller';
import { ICommentsAPIConsumer } from './http/ICommentsAPIConsumer';
import { CommentsAPIConsumer } from './http/CommentsAPIConsumer';
import { Comment } from '../domain/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsSeeder } from './seeder/CommentsSeeder';
import { ICommentsSeeder } from './seeder/ICommentsSeeder';
import { AuthModule } from 'src/auth/infrastructure/auth.module';

@Module({
	imports: [
		AuthModule,
		TypeOrmModule.forFeature([Comment]),
		HttpModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				baseURL: configService.get('JSON_PLACEHOLDER_API_URL') + 'comments'
			}),
		}),
	],
	controllers: [CommentsController],
	providers: [
		{
			provide: ICommentsAPIConsumer,
			useClass: CommentsAPIConsumer
		},
		{
			provide: ICommentsService,
			useClass: CommentsService
		},
		{
			provide: ICommentsSeeder,
			useClass: CommentsSeeder
		}
	],
	exports: [
		{
			provide: ICommentsSeeder,
			useClass: CommentsSeeder
		}
	]
})
export class CommentsModule { }

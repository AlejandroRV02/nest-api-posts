import { Module, OnApplicationBootstrap, ValidationPipe } from '@nestjs/common';
import { PostsModule } from './posts/infrastructure/posts.module';
import { DatabaseModule } from './database.module';
import { CommentsModule } from './comments/infrastructure/comments.module';
import { UsersModule } from './users/infrastructure/users.module';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/infrastructure/auth.module';
import * as Joi from 'joi';
import { IUsersSeeder } from './users/infrastructure/seeder/IUsersSeeder';
import { IPostsSeeder } from './posts/infrastructure/seeder/IPostsSeeder';
import { ICommentsSeeder } from './comments/infrastructure/seeder/ICommentsSeeder';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.development`,
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        PORT: Joi.number()
      }),
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true }
      }),
    }
  ],
})
export class AppModule implements OnApplicationBootstrap {

  constructor(
    private readonly usersSeeder: IUsersSeeder,
    private readonly postsSeeder: IPostsSeeder,
    private readonly commentsSeeder: ICommentsSeeder,

  ) { }

  async onApplicationBootstrap() {
    const result = await this.usersSeeder.setUsers()

    if (result.continue) {
      const posts = await this.postsSeeder.setPosts(result.users);
      await this.commentsSeeder.setComments(posts);
    }
  }

}

import { Module } from '@nestjs/common';
import { IUsersService } from '../application/users.service.interface';
import { UsersService } from '../application/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user.entity';
import { IUsersSeeder } from './seeder/IUsersSeeder';
import { UsersSeeder } from './seeder/UsersSeeder';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [
		{
			provide: IUsersService,
			useClass: UsersService
		},
		{
			provide: IUsersSeeder,
			useClass: UsersSeeder
		}
	],
	exports: [
		{
			provide: IUsersService,
			useClass: UsersService
		},
		{
			provide: IUsersSeeder,
			useClass: UsersSeeder
		},
	]
})
export class UsersModule { }

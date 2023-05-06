import { InjectRepository } from "@nestjs/typeorm";
import { IUsersSeeder } from "./IUsersSeeder";
import { Repository } from "typeorm";
import { User } from "src/users/domain/user.entity";
import * as bcrypt from "bcrypt";

export class UsersSeeder implements IUsersSeeder {

	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>,
	) { }

	async setUsers() {
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash("password", salt)
		const usersToSave: Partial<User>[] = [
			{
				email: "user1@mail.com",
				password: password,
				name: "User 1"
			},
			{
				email: "user2@mail.com",
				password: password,
				name: "User 2"
			},
			{
				email: "user3@mail.com",
				password: password,
				name: "User 3"
			},
			{
				email: "user4@mail.com",
				password: password,
				name: "User 4"
			},
			{
				email: "user5@mail.com",
				password: password,
				name: "User 5"
			},
			{
				email: "user6@mail.com",
				password: password,
				name: "User 6"
			},
			{
				email: "user7@mail.com",
				password: password,
				name: "User 7"
			},
			{
				email: "user8@mail.com",
				password: password,
				name: "User 8"
			},
			{
				email: "user9@mail.com",
				password: password,
				name: "User 9"
			},
			{
				email: "user10@mail.com",
				password: password,
				name: "User 10"
			},
		]
		const usersCount = await this.usersRepository.count();

		if (usersCount === 0) {
			return {
				continue: true,
				users: await this.usersRepository.save(usersToSave)
			}
		}

		return {
			continue: false,
			users: []
		}
	}

}
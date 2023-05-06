import { Injectable, NotFoundException } from "@nestjs/common";
import { IUsersService } from "./users.service.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { User } from "../domain/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements IUsersService {
	constructor(
		@InjectRepository(User) private readonly usersRepository: Repository<User>
	) { }

	async create(user: DeepPartial<User>): Promise<DeepPartial<User>> {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt)

		const userSaved = await this.usersRepository.save(user);

		delete userSaved.password;

		return userSaved;
	}

	async update(id: number, attrs: Partial<User>): Promise<User> {
		const user = await this.usersRepository.findOneBy({ id });

		if (!user) throw new NotFoundException("User not found");

		Object.assign(user, attrs);

		return await this.usersRepository.save(user);
	}

	async findByEmail(email: string) {
		return await this.usersRepository.findOneBy({ email })
	}

	async findById(id: number) {
		return await this.usersRepository.findOneBy({ id })
	}
}
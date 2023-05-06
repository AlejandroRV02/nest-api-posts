import { DeepPartial } from "typeorm";
import { User } from "../domain/user.entity";

export abstract class IUsersService {
	abstract create(user: DeepPartial<User>): Promise<DeepPartial<User>>;
	abstract update(id: number, attrs: Partial<User>): Promise<User>;
	abstract findByEmail(email: string): Promise<User>;
	abstract findById(id: number): Promise<User>;
}
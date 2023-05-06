import { User } from "src/users/domain/user.entity";

export abstract class IPostsSeeder {
	abstract setPosts(users: User[]);
}
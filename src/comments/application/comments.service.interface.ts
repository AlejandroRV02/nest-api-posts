import { User } from "src/users/domain/user.entity";

export abstract class ICommentsService {
	abstract getPostComments(id: number, user: User);
}
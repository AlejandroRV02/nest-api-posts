import { Injectable, NotFoundException } from "@nestjs/common";
import { ICommentsService } from "./comments.service.interface";
import { Comment } from "../domain/comment.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/domain/user.entity";

@Injectable()
export class CommentsService implements ICommentsService {

	constructor(@InjectRepository(Comment) private readonly commentsRepository: Repository<Comment>) { }

	async getPostComments(id: number, user: User) {
		const comments = await this.commentsRepository.find({
			where: {
				post: { id, user: { id: user.id } }
			}
		})

		if (comments.length === 0) throw new NotFoundException("No comments found for this post")

		return comments;
	}
}
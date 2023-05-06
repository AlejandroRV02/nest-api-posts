import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Controller, Get, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ICommentsService } from "src/comments/application/comments.service.interface";
import { GetPostCommentsQuery } from "src/comments/domain/dto/GetPostCommentsQuery";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";
import { User } from "src/users/domain/user.entity";
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
	constructor(private readonly commentsService: ICommentsService) { }

	@Get()
	@UsePipes(ValidationPipe)
	@ApiQuery({ name: 'postId', type: Number })
	async getCommentsOfPost(
		@Query() query: GetPostCommentsQuery,
		@GetUser() user: User
	) {
		return await this.commentsService.getPostComments(query.postId, user);
	}
}

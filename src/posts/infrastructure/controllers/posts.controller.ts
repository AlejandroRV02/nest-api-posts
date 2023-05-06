import { Controller, Get, Query, UsePipes, ValidationPipe, Param, Put, Body, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { IPostsService } from "src/posts/application/posts.service.interface";
import { GetPostsPaginatedQuery } from "src/posts/domain/dto/GetPostsPaginated.dto";
import { UpdatePostDto } from "src/posts/domain/dto/UpdatePost.dto";
import { AuthGuard } from '@nestjs/passport';
import { User } from "src/users/domain/user.entity";
import { GetUser } from "src/auth/infrastructure/decorators/get-user.decorator";

@ApiBearerAuth()
@UseGuards(AuthGuard())
@ApiTags('Posts')
@Controller('posts')
export class PostsController {
	constructor(
		private readonly postsService: IPostsService
	) { }

	@Get()
	@UsePipes(ValidationPipe)
	@ApiQuery({ name: 'take', type: Number })
	@ApiQuery({ name: 'skip', type: Number })
	async getPostsPaginated(
		@Query() query: GetPostsPaginatedQuery,
		@GetUser() user: User
	) {
		return await this.postsService.getPostsPaginated(query, user);
	}

	@Get(':id')
	async getPostById(
		@Param('id') id: number,
		@GetUser() user: User
	) {
		return await this.postsService.getPostById(id, user);
	}

	@Get(':id/comments')
	async getPostByIdWithComments(
		@Param('id') id: number,
		@GetUser() user: User
	) {
		return await this.postsService.getPostByIdWithComments(id, user);
	}

	@Put(':id')
	async updatePost(
		@Param('id') id: number,
		@Body() updatePostDto: UpdatePostDto,
		@GetUser() user: User
	) {
		return await this.postsService.updatePost(id, updatePostDto, user);
	}

	@Delete(':id')
	async deletePost(
		@Param('id') id: number,
		@GetUser() user: User
	) {
		return await this.postsService.deletePost(id, user);
	}
}
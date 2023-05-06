import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class GetPostCommentsQuery {
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	postId: number;
}
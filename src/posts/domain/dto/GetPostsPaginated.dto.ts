import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";

export class GetPostsPaginatedQuery {

	@IsNotEmpty()
	@Min(10)
	@Max(20)
	@IsNumber()
	take: number;

	@Min(0)
	@IsNotEmpty()
	@IsNumber()
	skip: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdatePostDto {
	@ApiProperty()
	@IsOptional()
	@IsString()
	title: string

	@ApiProperty()
	@IsOptional()
	@IsString()
	body: string
}
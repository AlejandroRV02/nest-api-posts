import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IAuthService } from "src/auth/application/auth.service.interface";
import { SignInDto } from "src/auth/dto/Signin.dto";
import { CreateUserDto } from "src/users/domain/dto/CreateUser.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: IAuthService) { }

	@Post('signup')
	async signup(
		@Body() createUserDto: CreateUserDto
	) {
		return await this.authService.signUp(createUserDto);
	}

	@Post('signin')
	async signin(
		@Body() signInDto: SignInDto
	) {
		return await this.authService.signIn(signInDto);
	}
}
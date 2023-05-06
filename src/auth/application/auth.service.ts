import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { IAuthService } from "./auth.service.interface";
import { IUsersService } from "src/users/application/users.service.interface";
import { CreateUserDto } from "src/users/domain/dto/CreateUser.dto";
import { User } from "src/users/domain/user.entity";
import { JwtPayload } from "../infrastructure/jwt/jwt-payload.interface";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import { SignInDto } from "../dto/Signin.dto";
import { DeepPartial } from "typeorm";

@Injectable()
export class AuthService implements IAuthService {

	constructor(
		private readonly usersService: IUsersService,
		private readonly jwtService: JwtService,
	) { }


	async signUp(createUserDto: CreateUserDto): Promise<DeepPartial<User>> {
		const existingUser = await this.usersService.findByEmail(createUserDto.email);

		if (existingUser) throw new BadRequestException("User already exists");

		const user = await this.usersService.create(createUserDto);

		return user;
	}

	async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
		const user = await this.usersService.findByEmail(signInDto.email);

		if (!user) throw new UnauthorizedException("Please check your credentials");

		const isCorrectPassword = await this.areMatchingPasswords(user, signInDto.password);

		if (!isCorrectPassword) throw new UnauthorizedException("Please check your credentials");

		return await this.generateToken({ id: user.id, name: user.name, email: user.email });
	}

	async areMatchingPasswords(user: User, password: string): Promise<boolean> {
		return await bcrypt.compare(password, user.password)
	}

	async generateToken(payload: JwtPayload): Promise<{ accessToken: string }> {
		const accessToken = await this.jwtService.sign(payload);

		return { accessToken };
	}

}
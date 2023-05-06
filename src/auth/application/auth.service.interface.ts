import { CreateUserDto } from "src/users/domain/dto/CreateUser.dto";
import { SignInDto } from "../dto/Signin.dto";
import { DeepPartial } from "typeorm";
import { User } from "src/users/domain/user.entity";
import { JwtPayload } from "../infrastructure/jwt/jwt-payload.interface";

export abstract class IAuthService {
	abstract signIn(signInDto: SignInDto): Promise<{ accessToken: string }>;
	abstract signUp(createUserDto: CreateUserDto): Promise<DeepPartial<User>>;
	abstract areMatchingPasswords(user: User, password: string): Promise<boolean>;
	abstract generateToken(payload: JwtPayload): Promise<{ accessToken: string }>;
}
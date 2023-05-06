import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/auth.controller";
import { UsersModule } from "src/users/infrastructure/users.module";
import { IAuthService } from "../application/auth.service.interface";
import { AuthService } from "../application/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./jwt/jwt.strategy";

@Module({
	imports: [
		ConfigModule,
		UsersModule,
		PassportModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				defaultStrategy: configService.get('PASSPORT_DEFAULT_STRATEGY'),
			}),
		}),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				global: true,
				secret: configService.get("JWT_SECRET"),
				signOptions: {
					expiresIn: configService.get('JWT_EXPIRATION_TIME'),
				},
			})
		}),
	],
	controllers: [AuthController],
	providers: [
		{
			provide: IAuthService,
			useClass: AuthService
		},
		JwtStrategy,
		ConfigService
	],
	exports: [
		JwtModule,
		PassportModule,
		{
			provide: IAuthService,
			useClass: AuthService
		}
	]
})
export class AuthModule { }
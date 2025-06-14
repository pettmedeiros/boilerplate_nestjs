import { Body, Controller, Post } from "@nestjs/common";
import { LoginUsuarioUseCase } from "../auth.usecase/login-usuario.useCase";
import { AuthLoginDto } from "../auth.dto/auth-login.dto";

@Controller('usuarios')
export class AuthController {
    constructor (
        private readonly loginUseCase: LoginUsuarioUseCase
    ){}

     @Post('login')
        async login(@Body() dto: AuthLoginDto) {
            return this.loginUseCase.executar(dto);
        }
}
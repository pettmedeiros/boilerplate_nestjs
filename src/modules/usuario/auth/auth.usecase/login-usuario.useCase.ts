import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository.interface";
import { AuthService } from "../auth.service";
import { AuthLoginDto } from "../auth.dto/auth-login.dto";

@Injectable()
export class LoginUsuarioUseCase {
    constructor(
        @Inject('IUSUARIO_REPOSITORY')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly authService: AuthService
    ) {}

    async executar(dto: AuthLoginDto): Promise<{ accessToken: string; usuario: { id: number; nome: string; email: string } }> {
        const usuario = await this.usuarioRepository.buscarPorEmail(dto.email);
        if (!usuario) {
            throw new UnauthorizedException('Credenciais inválidas!');
        }

        const senhaValida = await this.usuarioRepository.verificarSenha(dto.email, dto.senha);
        if (!senhaValida) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const token = await this.authService.gerarToken({
            id: usuario.getId() as number,
            nome: usuario.getNome(),
            email: usuario.getEmail()
        });

        return {
            accessToken: token,
            usuario: {
                id: usuario.getId() as number,
                nome: usuario.getNome(),
                email: usuario.getEmail()
            }
        };
    }
}
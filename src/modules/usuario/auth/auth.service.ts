import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private jwtService: JwtService){}

    async gerarToken(usuario: { id: number, email: string, nome: string}): Promise<string>{
        const payload = { sub: usuario.id, email: usuario.email, nome: usuario.nome}
        return this.jwtService.sign(payload);
    }
}
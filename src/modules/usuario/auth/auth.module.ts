import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UsuarioRepositoryImpl } from "../infrastucture/repositories/usuario.repository";
import { LoginUsuarioUseCase } from "./auth.usecase/login-usuario.useCase";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller/auth.controller";


@Module({
    imports: [ JwtModule.register({
        secret: process.env.JWT_SECRET, 
    }),
    PrismaModule], 
    controllers: [AuthController],
    providers: [ LoginUsuarioUseCase, PrismaService, AuthService,
       { provide:'IUSUARIO_REPOSITORY',
        useClass: UsuarioRepositoryImpl,
       }
    ]
})
export class AuthModule {}
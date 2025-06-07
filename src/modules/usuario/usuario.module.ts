import { Module } from "@nestjs/common";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioRepository } from "./domain/repositories/usuario.repository.interface";
import { UsuarioRepositoryImpl } from "./infrastucture/repositories/usuario.repository";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [
    {
      provide: 'UsuarioRepository',
      useClass: UsuarioRepositoryImpl,
    },
  ],
})
export class UsuarioModule {}

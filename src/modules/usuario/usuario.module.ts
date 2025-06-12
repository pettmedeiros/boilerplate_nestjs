import { Module } from "@nestjs/common";
import { UsuarioController } from "./controllers/usuario.controller";
import { UsuarioRepository } from "./domain/repositories/usuario.repository.interface";
import { UsuarioRepositoryImpl } from "./infrastucture/repositories/usuario.repository";
import { PrismaModule } from "src/prisma/prisma.module";
import { CriarUsuarioUseCase } from "./usecases/criar-usuario.usecase";
import { ListarTodosUseCase } from "./usecases/listar-usuario.usecase";

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController],
  providers: [
    CriarUsuarioUseCase,
    ListarTodosUseCase,
    {
      provide: 'IUSUARIO_REPOSITORY',
      useClass: UsuarioRepositoryImpl,
    },
  ],
})
export class UsuarioModule {}

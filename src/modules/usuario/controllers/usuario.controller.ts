import { Body, Controller, Get, Post, ValidationPipe } from "@nestjs/common";
import { CriarUsuarioUseCase } from "../usecases/criar-usuario.usecase";
import { CriarUsuarioDto } from "../dtos/criar-usuario.dto";
import { ListarTodosUseCase } from "../usecases/listar-usuario.usecase";


@Controller('usuarios')
export class UsuarioController {
    constructor(
        private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
        private readonly listarTodosUseCase: ListarTodosUseCase,

    ){}


    @Post()
    async criarUsuario(@Body(new ValidationPipe()) dto: CriarUsuarioDto){
        return await this.criarUsuarioUseCase.executar(dto);
    }
    
    @Get()
    async listarTodos(){
        return this.listarTodosUseCase.listarTodos();
    }

}
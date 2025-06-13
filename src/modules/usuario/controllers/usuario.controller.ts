import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { CriarUsuarioUseCase } from "../usecases/criar-usuario.usecase";
import { CriarUsuarioDto } from "../dtos/criar-usuario.dto";
import { ListarTodosUseCase } from "../usecases/listar-usuario.usecase";
import { DeletarUsecase } from "../usecases/deletar-usuario.usecase";
import { AtualizarUsuarioDto } from "../dtos/atualizar-usuario.dto";
import { AtualizarUsuarioUseCase } from "../usecases/atualizar-usuario.useCase";
import { AtualizarParcialmenteUsuarioDto } from "../dtos/atualizar-parcialmente-usuario.dto";
import { AtualizarParcialmenteUsuarioUseCase } from "../usecases/atualizar-parcialmente-usuario.usecase";


@Controller('usuarios')
export class UsuarioController {
    constructor(
        private readonly criarUsuarioUseCase: CriarUsuarioUseCase,
        private readonly listarTodosUseCase: ListarTodosUseCase,
        private readonly deletarUseCase: DeletarUsecase,
        private readonly atualizarUsuarioUseCase: AtualizarUsuarioUseCase,
        private readonly atualizarParcialmenteUsuarioUseCase: AtualizarParcialmenteUsuarioUseCase

    ){}


    @Post()
    async criarUsuario(@Body(new ValidationPipe()) dto: CriarUsuarioDto){
        return await this.criarUsuarioUseCase.executar(dto);
    }
    
    @Get()
    async listarTodos(){
        return this.listarTodosUseCase.listarTodos();
    }

    @Put(':id')
    async atualizar(
        @Body() dto: AtualizarUsuarioDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.atualizarUsuarioUseCase.executar(id, dto);
    }

    @Patch(':id')
    async atualizarParcialmente(
        @Body() dto: AtualizarParcialmenteUsuarioDto,
        @Param('id', ParseIntPipe) id: number) {
        return this.atualizarParcialmenteUsuarioUseCase.executar(id, dto);
    }
    
    @Delete(':id')
    async deletarUsuario(@Param('id', ParseIntPipe) id: number){
        return this.deletarUseCase.deletar(id);
    }
}
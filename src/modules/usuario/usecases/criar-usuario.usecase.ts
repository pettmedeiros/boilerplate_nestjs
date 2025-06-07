import { Inject, Injectable } from "@nestjs/common";
import { CriarUsuarioDto } from "../dtos/criar-usuario.dto";
import { UsuarioDto } from "../dtos/usuario.dto";
import { UsuarioMapper } from "../mappers/usuario.mapper";
import { UsuarioRepository } from "../domain/repositories/usuario.repository.interface";
import { Usuario } from "../domain/entities/usuario.entity";

export class CriarUsuarioUseCase{
     constructor(
    @Inject('IUSUARIO_REPOSITORY')
    private readonly usuarioRepository: UsuarioRepository,
  ) {}

  async executar(dto: CriarUsuarioDto): Promise<UsuarioDto> {
    const novoUsuario = new Usuario(
      dto.nome,
      dto.email,
      dto.senha,
    );

    const usuarioCriado = await this.usuarioRepository.criarUsuario(novoUsuario);

    return UsuarioMapper.toDto(usuarioCriado); //criei o retorno dto
  }

}

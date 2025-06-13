import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ExisteIdUsecase } from "./exiteId-usuario.useCase";
import { UsuarioRepository } from "../domain/repositories/usuario.repository.interface";
import { AtualizarParcialmenteUsuarioDto } from "../dtos/atualizar-parcialmente-usuario.dto";
import { Usuario } from "../domain/entities/usuario.entity"; // Usando a entidade de domínio

@Injectable() // Adicionando a anotação Injectable
export class AtualizarParcialmenteUsuarioUseCase {
  constructor(
    @Inject('IUSUARIO_REPOSITORY')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly existeId: ExisteIdUsecase
  ) {}

  async executar(id: number, dto: AtualizarParcialmenteUsuarioDto): Promise<Usuario> {
    const existe = await this.existeId.executar(id);

    if (!existe) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Buscar o usuário existente
    const usuario = await this.usuarioRepository.buscarPorId(id);
    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Aplicar atualizações na instância existente
    let emailAtualizado = false;
    if (dto.nome) {
      usuario.atualizarNome(dto.nome.trim());
    }
    if (dto.email) {
      try {
        usuario.atualizarEmail(dto.email.trim());
        await this.usuarioRepository.atualizarEmail(usuario); // Tenta atualizar email
        emailAtualizado = true;
      } catch (error) {
        if (error.code === 'P2002') {
          throw new BadRequestException('O email já está em uso por outro usuário.');
        }
        throw error; // Propaga outros erros
      }
    }
    if (dto.senha) {
      usuario.atualizarSenha(dto.senha.trim());
    }

    // Salvar apenas se houver mudanças
    if (dto.nome || dto.senha || emailAtualizado) {
      try {
        await this.usuarioRepository.salvar(usuario);
      } catch (error) {
        if (error.message.includes('email já está em uso')) {
          throw new BadRequestException('O email já está em uso por outro usuário.');
        }
        throw error;
      }
    }

    // Buscar novamente para garantir que o estado está atualizado
    const usuarioAtualizado = await this.usuarioRepository.buscarPorId(id);
    if (!usuarioAtualizado) {
      throw new NotFoundException('Usuário não encontrado após atualização');
    }

    return usuarioAtualizado;
  }
}
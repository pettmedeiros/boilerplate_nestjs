import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "../domain/repositories/usuario.repository.interface";
import { ExisteIdUsecase } from "./exiteId-usuario.useCase";

@Injectable()
export class DeletarUsecase {
  constructor(
    @Inject('IUSUARIO_REPOSITORY')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly existeId: ExisteIdUsecase,
  ) {}

  async deletar(id: number): Promise<{ mensagem: string }> {
    const existe = await this.existeId.executar(id);

    if (!existe) {
      throw new NotFoundException(`Usuario com id ${id} não foi encontrado!`);
    }

    await this.usuarioRepository.deletar(id);

    return { mensagem: `Usuário com id ${id} foi excluído com sucesso!` };
  }
}

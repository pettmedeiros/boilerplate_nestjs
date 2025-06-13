import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsuarioRepository } from '../domain/repositories/usuario.repository.interface';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ExisteIdUsecase {
  constructor(
    @Inject('IUSUARIO_REPOSITORY')
    private readonly usuarioRepository: UsuarioRepository,
    private readonly prisma: PrismaService,
  ) {}

  async executar(id: number): Promise<boolean> {
  const IdValido = await this.usuarioRepository.existeId(id);

  if (!IdValido) {
    throw new NotFoundException(`Usuario com ID ${id} não encontrado!`);
  }
    //RETORNAR UM DTO
    
    return true; // aqui quero retornar apenas se existe ID se não lança exceptions, acho que naõ faz sentido criar DTO
  }
}

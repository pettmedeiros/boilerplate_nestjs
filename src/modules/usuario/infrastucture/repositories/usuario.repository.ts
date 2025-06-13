import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Usuario } from "../../domain/entities/usuario.entity";

@Injectable()
export class UsuarioRepositoryImpl implements UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toDomain(usuarioPrisma: any): Usuario {
    return new Usuario(
      usuarioPrisma.nome,
      usuarioPrisma.email,
      usuarioPrisma.senha,
      usuarioPrisma.id,
    );
  }

  async criarUsuario(usuario: Usuario): Promise<Usuario> {
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        email: usuario.getEmail(),
        senha: usuario.getSenha(),
        nome: usuario.getNome(),
      },
    });
    return this.toDomain(novoUsuario);
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: id },
    });
    if (!usuario) return null;
    return new Usuario(usuario.nome, usuario.email, usuario.senha, usuario.id);
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    if (!usuario) return null;
    return this.toDomain(usuario);
  }

  async listarTodos(): Promise<Usuario[]> {
    const usuariosPrisma = await this.prisma.usuario.findMany();
    return usuariosPrisma.map((usuarioPrisma) => this.toDomain(usuarioPrisma));
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
  const atualizado = await this.prisma.usuario.update({
    where: { id: usuario.getId() },
    data: {
      nome: usuario.getNome(),
      email: usuario.getEmail(),
      senha: usuario.getSenha(),
    },
  });

  return this.toDomain(atualizado);
}

  async atualizarNome(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: { nome: usuario.getNome() },
    });
  }

  async atualizarEmail(usuario: Usuario): Promise<Usuario> {
    // Verificar se o email já existe para outro usuário
    const emailExistente = await this.prisma.usuario.findFirst({
      where: {
        email: usuario.getEmail(),
        id: { not: usuario.getId() }, // Exclui o próprio usuário
      },
    });

    if (emailExistente) {
      throw new Error('O email já está em uso por outro usuário.');
    }

    const atualizado = await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: { email: usuario.getEmail() },
    });
    return this.toDomain(atualizado);
  }

  async atualizarSenha(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: usuario.getId()},
      data: { senha: usuario.getSenha() },
    });
  }

  async deletar(id: number): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id: id },
    });
  }

  async existeId(id: number): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: id },
      select: { id: true },
    });
    return !!usuario;
  }
  
  async salvar(usuario: Usuario): Promise<void> {
    await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: {
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        senha: usuario.getSenha(),
      },
    });
  }
}
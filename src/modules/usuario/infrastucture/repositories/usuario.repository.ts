import { Injectable } from "@nestjs/common";
import { UsuarioRepository } from "../../domain/repositories/usuario.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Usuario } from "../../domain/entities/usuario.entity";
import * as bcrypt from 'bcrypt';

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
    const senhaHash = await bcrypt.hash(usuario.getSenha(), 10);
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        email: usuario.getEmail(),
        senha: senhaHash,
        nome: usuario.getNome(),
      },
    });
    return this.toDomain(novoUsuario);
  }

  async buscarPorId(id: number): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return usuario ? this.toDomain(usuario) : null; // Usando toDomain para consistência
  }

  async buscarPorEmail(email: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
    return usuario ? this.toDomain(usuario) : null;
  }

  async listarTodos(): Promise<Usuario[]> {
    const usuariosPrisma = await this.prisma.usuario.findMany();
    return usuariosPrisma.map((usuarioPrisma) => this.toDomain(usuarioPrisma));
  }

  async atualizar(usuario: Usuario): Promise<Usuario> {
    const senhaHash = await bcrypt.hash(usuario.getSenha(), 10);
    const atualizado = await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: {
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        senha: senhaHash,
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
    const emailExistente = await this.prisma.usuario.findFirst({
      where: {
        email: usuario.getEmail(),
        id: { not: usuario.getId() },
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
    const senhaHash = await bcrypt.hash(usuario.getSenha(), 10);
    await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: { senha: senhaHash },
    });
  }

  async deletar(id: number): Promise<void> {
    await this.prisma.usuario.delete({
      where: { id },
    });
  }

  async existeId(id: number): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true },
    });
    return !!usuario;
  }

  async salvar(usuario: Usuario): Promise<void> {
    const senhaHash = await bcrypt.hash(usuario.getSenha(), 10);
    await this.prisma.usuario.update({
      where: { id: usuario.getId() },
      data: {
        nome: usuario.getNome(),
        email: usuario.getEmail(),
        senha: senhaHash,
      },
    });
  }

  async verificarSenha(email: string, senha: string): Promise<boolean> {
    const usuario = await this.prisma.usuario.findUnique({where: {email}});
    if (!usuario) {
      return false;
    }
    return await bcrypt.compare(senha, usuario.senha);
  }
}
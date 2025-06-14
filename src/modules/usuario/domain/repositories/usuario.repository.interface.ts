import { Usuario } from "../entities/usuario.entity";


export const UsuarioRepository = 'UsuarioRepository'; // precisei criar um injecção de token para poder importar no Usuario.modele

export interface UsuarioRepository {

  criarUsuario(usuario: Usuario): Promise<Usuario>;
  buscarPorId(id: number): Promise<Usuario | null>;
  buscarPorEmail(email: string): Promise<Usuario | null>;
  listarTodos(): Promise<Usuario[]>;
  atualizar(usuario: Usuario): Promise<Usuario>;
  atualizarNome(usuario: Usuario): Promise<void>;
  atualizarEmail(usuario: Usuario): Promise<Usuario>; 
  atualizarSenha(usuario: Usuario): Promise<void>;
  deletar(id: number): Promise<void>;
  existeId(id: number): Promise<boolean>;
  salvar(usuario: Usuario): Promise<void>;
  verificarSenha(email: string, senha: string): Promise<boolean>;
}
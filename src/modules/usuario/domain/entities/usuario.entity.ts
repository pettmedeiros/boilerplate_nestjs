export class Usuario {
  private readonly id: number | undefined;
  private nome: string;
  private email: string;
  private senha: string;

  constructor(nome: string, email: string, senha: string, id?: number) {
    this.id = id; // id é opcional e pode ser undefined; o Prisma o gerará se não for fornecido
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  public getId(): number | undefined {
    return this.id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getEmail(): string {
    return this.email;
  }

  public getSenha(): string {
    return this.senha;
  }

  public atualizarNome(nome: string): void {
    this.nome = nome;
  }

  public atualizarSenha(senha: string): void {
    this.senha = senha;
  }

  public atualizarEmail(email: string): void{
    this.email = email;
  }
}
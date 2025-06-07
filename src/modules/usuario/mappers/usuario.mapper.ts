
import { Usuario } from "src/modules/usuario/domain/entities/usuario.entity";
import { UsuarioDto } from "../dtos/usuario.dto";

export class UsuarioMapper {
  static toDto(usuario: Usuario): UsuarioDto {
    const id = usuario.getId();
    if (!id) {
      throw new Error("Usuário sem ID não pode ser convertido para DTO");
    }

    return new UsuarioDto(
      id,
      usuario.getNome(),
      usuario.getEmail()
    );
  }

  static toDtoList(usuarios: Usuario[]): UsuarioDto[]{
        return usuarios.map(usuario => UsuarioMapper.toDto(usuario));

    }

}
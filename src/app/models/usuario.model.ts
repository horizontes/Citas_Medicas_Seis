export class Usuario {

    usuarioId!: number;
    nombres!: string;
    apellidos!: string;
    clave!: string;
    correo!: string;
    intentos?:number;

    creacion?: Date;
    actualizacion?: Date;
    estado?: number;

}
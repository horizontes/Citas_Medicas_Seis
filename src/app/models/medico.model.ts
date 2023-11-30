import { Especialidad } from "./especialidad.model";

export class Medico {

    medicoId!: number;
    nombreCompleto!: string;
    clave!: string;
    correo!: string;
    telefono?: string;
    cmp?: string;
    experiencia?: number;
    colaPacientes?: number;
    especialidades?: Array<Especialidad>;
    
    creacion?: Date;
    actualizacion?: Date;
    estado?: number;

}
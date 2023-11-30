import { Especialidad } from "./especialidad.model";
import { Medico } from "./medico.model";
import { Sede } from "./sede.model";
import { Usuario } from "./usuario.model";

export class Cita {

    citaId!: number;
    medico!: Medico;
    usuario!: Usuario;
    sede!: Sede;
    especialidad!: Especialidad;
    fecha!: Date;
    hora!: string;
    duracion!: number;
    confirmado?: boolean;

    creacion?: Date;
    actualizacion?: Date;
    estado?: number;

}
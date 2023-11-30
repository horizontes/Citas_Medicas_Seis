import { Sede } from "./sede.model";

export class Especialidad {

    especialidadId!: number;
    nombre!: string;
    sedes?: Sede[];
    
    creacion?: Date;
    actualizacion?: Date;
    estado?: number;

}
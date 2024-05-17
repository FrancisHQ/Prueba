import { IEstado } from './IEstado';
import { IPrioridad } from './IPrioridad';

export interface ITareas {
  id?: number;
  titulo?: string;
  descripcion?: string;
  fechaVencimiento?: string | null;
  prioridad?: IPrioridad;
  etiquetas?: string;
  estado?: IEstado;
}

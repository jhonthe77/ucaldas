import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propetario} from './propetario.model';
import {Imagen} from './imagen.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  barrio: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Propetario)
  propetarioId: string;

  @hasMany(() => Imagen)
  imagens: Imagen[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;

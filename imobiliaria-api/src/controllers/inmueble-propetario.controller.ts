import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Propetario,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmueblePropetarioController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/propetario', {
    responses: {
      '200': {
        description: 'Propetario belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Propetario)},
          },
        },
      },
    },
  })
  async getPropetario(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Propetario> {
    return this.inmuebleRepository.propetario(id);
  }
}

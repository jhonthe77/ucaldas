import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Propetario,
  Inmueble,
} from '../models';
import {PropetarioRepository} from '../repositories';

export class PropetarioInmuebleController {
  constructor(
    @repository(PropetarioRepository) protected propetarioRepository: PropetarioRepository,
  ) { }

  @get('/propetarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Propetario has many Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmueble)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.propetarioRepository.inmuebles(id).find(filter);
  }

  @post('/propetarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propetario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propetario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInPropetario',
            exclude: ['id'],
            optional: ['propetarioId']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.propetarioRepository.inmuebles(id).create(inmueble);
  }

  @patch('/propetarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propetario.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.propetarioRepository.inmuebles(id).patch(inmueble, where);
  }

  @del('/propetarios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Propetario.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.propetarioRepository.inmuebles(id).delete(where);
  }
}

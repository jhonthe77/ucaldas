import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Propetario, PropetarioRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class PropetarioRepository extends DefaultCrudRepository<
  Propetario,
  typeof Propetario.prototype.id,
  PropetarioRelations
> {

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Propetario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Propetario, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}

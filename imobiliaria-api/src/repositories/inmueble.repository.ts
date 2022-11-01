import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Propetario, Imagen} from '../models';
import {PropetarioRepository} from './propetario.repository';
import {ImagenRepository} from './imagen.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly propetario: BelongsToAccessor<Propetario, typeof Inmueble.prototype.id>;

  public readonly imagens: HasManyRepositoryFactory<Imagen, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PropetarioRepository') protected propetarioRepositoryGetter: Getter<PropetarioRepository>, @repository.getter('ImagenRepository') protected imagenRepositoryGetter: Getter<ImagenRepository>,
  ) {
    super(Inmueble, dataSource);
    this.imagens = this.createHasManyRepositoryFactoryFor('imagens', imagenRepositoryGetter,);
    this.registerInclusionResolver('imagens', this.imagens.inclusionResolver);
    this.propetario = this.createBelongsToAccessorFor('propetario', propetarioRepositoryGetter,);
    this.registerInclusionResolver('propetario', this.propetario.inclusionResolver);
  }
}

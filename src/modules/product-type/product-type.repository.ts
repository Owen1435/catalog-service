import { EntityRepository, Repository } from 'typeorm';
import { ProductTypeEntity } from '../../entity/product-type.entity';

@EntityRepository(ProductTypeEntity)
export class ProductTypeRepository extends Repository<ProductTypeEntity> {}

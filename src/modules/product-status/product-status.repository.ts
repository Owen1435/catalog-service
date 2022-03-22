import { EntityRepository, Repository } from 'typeorm';
import { ProductStatusEntity } from '../../entity/product-status.entity';

@EntityRepository(ProductStatusEntity)
export class ProductStatusRepository extends Repository<ProductStatusEntity> {}

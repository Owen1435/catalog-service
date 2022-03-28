import { ProductType } from 'libs/domain/product-service/product-type';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'product_type' })
export class ProductTypeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  type: ProductType;
}

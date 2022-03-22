import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductType } from '../domain/product-type';

@Entity({ name: 'product_type' })
export class ProductTypeEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  type: ProductType;
}

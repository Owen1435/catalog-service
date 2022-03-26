import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductCategoryEntity } from './product-category.entity';
import { ProductStatusEntity } from './product-status.entity';
import { ProductTypeEntity } from './product-type.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'numeric',
  })
  price: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  description: object;

  @ManyToOne(() => ProductStatusEntity, (status) => status.id)
  status: ProductStatusEntity;

  @ManyToOne(() => ProductTypeEntity, (type) => type.id)
  type: ProductTypeEntity;

  @OneToOne(() => ProductCategoryEntity, (category) => category.id)
  category: ProductCategoryEntity;
}

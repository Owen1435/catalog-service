import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductStatusEntity } from './product-status.entity';
import { ProductTypeEntity } from './product-type.entity';

@Entity({ name: 'products' })
export class ProductEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  title: string;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  description: object;

  @Column({
    type: 'numeric',
  })
  price: number;

  @ManyToOne(() => ProductStatusEntity, (status) => status.id)
  status: ProductStatusEntity;

  @ManyToOne(() => ProductTypeEntity, (type) => type.id)
  type: ProductTypeEntity;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  childCategory: string; //todo

  @Column({
    type: 'varchar',
    nullable: true,
  })
  parentCategory: string; //todo
}

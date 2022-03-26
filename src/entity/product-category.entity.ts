import { Column, Entity, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'product_category' })
export class ProductCategoryEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  category: string;

  @OneToOne(() => ProductCategoryEntity, (category) => category.category)
  parentCategory: ProductCategoryEntity;
}

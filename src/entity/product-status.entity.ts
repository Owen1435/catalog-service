import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'product_status' })
export class ProductStatusEntity extends BaseEntity {
  @Column({
    type: 'varchar',
  })
  status: string;
}

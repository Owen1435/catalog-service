import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductStatusEntity } from '../../entity/product-status.entity';
import { ProductStatusRepository } from './product-status.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductStatusEntity, ProductStatusRepository]),
  ],
  exports: [TypeOrmModule],
})
export class ProductStatusModule {}

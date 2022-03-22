import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTypeEntity } from '../../entity/product-type.entity';
import { ProductTypeRepository } from './product-type.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductTypeEntity, ProductTypeRepository]),
  ],
  exports: [TypeOrmModule],
})
export class ProductTypeModule {}

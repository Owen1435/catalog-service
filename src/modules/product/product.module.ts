import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { ProductEntity } from '../../entity/product.entity';
import { ProductTypeModule } from '../product-type/product-type.module';
import { ProductStatusModule } from '../product-status/product-status.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, ProductRepository]),
    ProductTypeModule,
    ProductStatusModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

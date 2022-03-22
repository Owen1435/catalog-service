import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import { ProductRepository } from './product.repository';
import { ProductTypeRepository } from '../product-type/product-type.repository';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ProductStatusRepository } from '../product-status/product-status.repository';
import { ProductEntity } from '../../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productTypeRepository: ProductTypeRepository,
    private productStatusRepository: ProductStatusRepository,
  ) {}

  async add(addDto: AddProductRequestDto): Promise<RmqResponse<string>> {
    try {
      const type = await this.productTypeRepository.findOne({
        type: addDto.type,
      });
      if (!type) {
        throw new HttpException('Type was not found', HttpStatus.BAD_REQUEST);
      }

      const status = await this.productStatusRepository.findOne({
        status: addDto.status,
      });
      if (!status) {
        throw new HttpException('Status was not found', HttpStatus.BAD_REQUEST);
      }

      const newProduct = {
        ...addDto,
        type,
        status,
        description: addDto.description
          ? JSON.parse(addDto.description)
          : // ? JSON.stringify(addDto.description)
            null,
      };

      await this.productRepository.save(newProduct);

      return new RmqResponse<string>('Add successes', HttpStatus.CREATED);
    } catch (error) {
      return new RmqResponse<any>(null, HttpStatus.BAD_REQUEST, error);
    }
  }

  async getAll(): Promise<RmqResponse<ProductEntity[]>> {
    try {
      const products = await this.productRepository.find();
      return new RmqResponse<ProductEntity[]>(products, HttpStatus.OK);
    } catch (error) {
      return new RmqResponse<any>(null, HttpStatus.BAD_REQUEST, error);
    }
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import { ProductRepository } from './product.repository';
import { ProductTypeRepository } from '../product-type/product-type.repository';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ProductStatusRepository } from '../product-status/product-status.repository';
import { ProductEntity } from '../../entity/product.entity';
import { rmqErrorResponse } from '../../../libs/common/rmq/rmq-error.response';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private productTypeRepository: ProductTypeRepository,
    private productStatusRepository: ProductStatusRepository,
    private readonly amqpConnection: AmqpConnection,
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
        description: addDto.description ? addDto.description : null,
      };

      const savedProduct = await this.productRepository.save(newProduct);

      this.amqpConnection.publish('amq.direct', 'product.added.route', {
        product: savedProduct,
      });

      return new RmqResponse<string>('Add successes', HttpStatus.CREATED);
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }

  async getAll(): Promise<RmqResponse<ProductEntity[]>> {
    try {
      const products = await this.productRepository.find({
        relations: ['status', 'type'],
      });
      return new RmqResponse<ProductEntity[]>(products, HttpStatus.OK);
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }

  async getById(id: number): Promise<RmqResponse<ProductEntity>> {
    try {
      const product = await this.productRepository.findOne(id, {
        relations: ['status', 'type'],
      });
      if (!product) {
        throw new HttpException('Product was not found', HttpStatus.NOT_FOUND);
      }

      return new RmqResponse<ProductEntity>(product, HttpStatus.OK);
    } catch (error) {
      return rmqErrorResponse(error);
    }
  }
}

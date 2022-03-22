import { Body, Controller, Post } from '@nestjs/common';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { ProductService } from './product.service';
import { AddProductRequestDto } from './dto/add.product.request.dto';
import { RmqResponse } from '../../../libs/common/rmq/rmq.response';
import { ProductEntity } from '../../entity/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'product.add.route',
    queue: 'product.add.queue',
  })
  async add(
    @Body() addDto: AddProductRequestDto,
  ): Promise<RmqResponse<string>> {
    return this.productService.add(addDto);
  }

  @RabbitRPC({
    exchange: 'amq.direct',
    routingKey: 'product.get.all.route',
    queue: 'product.get.all.queue',
  })
  async getAll(): Promise<RmqResponse<ProductEntity[]>> {
    return this.productService.getAll();
  }
}

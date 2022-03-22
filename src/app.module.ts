import { Module } from '@nestjs/common';
import { OrmModule } from 'libs/common/orm/orm.module';
import { RmqModule } from 'libs/common/rmq/rmq.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [ConfigModule.forRoot(), OrmModule, RmqModule, ProductModule],
  controllers: [AppController],
})
export class AppModule {}

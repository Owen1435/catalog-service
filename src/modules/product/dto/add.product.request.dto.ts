import { ProductType } from 'libs/domain/product-service/product-type';

export class AddProductRequestDto {
  title: string;
  price: number;
  type: ProductType;
  status: string;
  description?: object;
}

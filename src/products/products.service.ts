import { v4 as uuid } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  create(createProductDto: CreateProductDto) {
    const { name, description, price } = createProductDto;
    const newProduct = new Product(uuid(), name, price, description);
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('product not found');
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id);

    product.updateWith(
      updateProductDto.name,
      updateProductDto.price,
      updateProductDto.description,
    );

    return product;
  }

  remove(id: string) {
    const product = this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
    return {
      message: `Product deleted successfully with id: ${id}`,
      data: product,
    };
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/CreateProductDTO';
import { ProductRepository } from './product.repository';
import { ProductEntity } from './product.entity';
import { randomUUID } from 'crypto';
import { UpdateProductDTO } from './dto/UpdateProductDTO';
import { ProductService } from './product.service';

@Controller('/products')
export class ProductController {
  constructor(
    private productRepository: ProductRepository,
    private productService: ProductService,
  ) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = productData.name;
    product.userId = productData.userId;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    product.characteristics = productData.characteristics;
    product.images = productData.imagens;

    const createdProduct = this.productService.createProduct(product);

    return createdProduct;
  }

  @Get()
  async listProducts() {
    return this.productRepository.list();
  }

  @Put('/:id')
  async updateProduct(
    @Param() id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const updatedProduct = this.productService.updateProduct(id, productData);

    return updatedProduct;
  }

  @Delete('/:id')
  async removeProduct(@Param() id: string) {
    const productToBeDeleted = this.productService.deleteProduct(id);

    return {
      message: `Product deleted successfully`,
      product: productToBeDeleted,
    };
  }
}

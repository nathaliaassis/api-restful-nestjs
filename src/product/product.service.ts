import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UpdateProductDTO } from './dto/UpdateProductDTO';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: ProductEntity) {
    await this.productRepository.save(product);
  }

  async listProducts() {
    const savedProducts = await this.productRepository.find();

    return savedProducts;
  }

  async updateProduct(id: string, product: UpdateProductDTO) {
    await this.productRepository.update(id, product);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
  }
}

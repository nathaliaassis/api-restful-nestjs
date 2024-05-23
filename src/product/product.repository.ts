import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private products = [];

  async save(product) {
    this.products.push(product);
  }

  async list() {
    return this.products;
  }

  private getProductById(id: string) {
    const existingProduct = this.products.find((product) => product.id === id);

    if (!existingProduct) {
      throw new Error('Product not found');
    }

    return existingProduct;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const existingProduct = this.getProductById(id);
    const notUpdateData = ['id', 'userId'];

    Object.entries(productData).forEach(([key, value]) => {
      if (notUpdateData.includes(key)) return;

      existingProduct[key] = value;
    });

    return existingProduct;
  }

  async remove(id: string) {
    const existingProduct = this.getProductById(id);

    this.products = this.products.filter((product) => product.id !== id);

    return existingProduct;
  }
}

class ProductCharacteristicListDTO {
  nome: string;
  description: string;
}

class ProductImageListDTO {
  url: string;
  description: string;
}

export class ProductListDTO {
  id: string;
  userId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  characteristics: ProductCharacteristicListDTO[];
  images: ProductImageListDTO[];
}

import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ProductFeaturesDTO } from './ProductFeaturesDTO';
import { Type } from 'class-transformer';

export class CreateProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @MinLength(1)
  @Type(() => ProductFeaturesDTO)
  features: ProductFeaturesDTO[];
  // images: ImagemProdutoDTO[];

  @IsNotEmpty()
  category: string;
}

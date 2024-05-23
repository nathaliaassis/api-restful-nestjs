import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProductCharacteristicsDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is requied' })
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class CreateProductDTO {
  @IsUUID()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(1, { message: 'Price must be greater than zero' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Invalid value' })
  quantity: number;

  @IsString()
  @IsNotEmpty({ message: 'Description can not be empty' })
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicsDTO)
  characteristics: ProductCharacteristicsDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  imagens: ProductImageDTO[];

  @IsNotEmpty()
  category: string;
}

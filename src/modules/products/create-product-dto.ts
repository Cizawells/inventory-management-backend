import { ApiProperty } from '@nestjs/swagger';

import { ProductType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop' }) // 👈 shows in Swagger
  @IsString()
  @IsNotEmpty({ message: 'This field can not be empty' })
  name: string;

  @ApiProperty({ example: '123' }) // 👈 shows in Swagger
  @IsString()
  sku: string;

  @ApiProperty({ example: 'BAR444' }) // 👈 shows in Swagger
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiProperty({ example: 'product description' }) // 👈 shows in Swagger
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'stockable' }) // 👈 shows in Swagger
  @IsEnum(ProductType)
  productType: ProductType;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  brandId?: string;

  @ApiProperty({ example: '5000' }) // 👈 shows in Swagger
  @IsOptional()
  @IsNumber()
  costPrice?: number;

  @ApiProperty({ example: '8000' }) // 👈 shows in Swagger
  @IsOptional()
  @IsNumber()
  salePrice?: number;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  uomId?: string;

  @ApiProperty({ example: 1 }) // 👈 shows in Swagger
  @IsOptional()
  @IsNumber()
  stockQty?: number;

  @ApiProperty({ example: 1 }) // 👈 shows in Swagger
  @IsOptional()
  @IsNumber()
  reorderLevel?: number;

  @ApiProperty({ example: true }) // 👈 shows in Swagger
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  taxCategoryId?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  incomeAccountId?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  expenseAccountId?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  inventoryAccountId?: string;

  @ApiProperty({ example: '1' }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  defaultSupplierId?: string;

  @ApiProperty({ example: 1 }) // 👈 shows in Swagger
  @IsOptional()
  @IsNumber()
  leadTimeDays?: number;

  @ApiProperty({ example: false }) // 👈 shows in Swagger
  @IsOptional()
  @IsBoolean()
  hasVariants?: boolean;

  @ApiProperty({ example: null }) // 👈 shows in Swagger
  @IsOptional()
  @IsUUID()
  parentId?: string;
}

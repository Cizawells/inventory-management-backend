import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Product } from '@prisma/client';
import { CreateProductDto } from './create-product-dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('sortBy') sortBy: string = 'createdAt',
    @Query('order') order: 'asc' | 'desc' = 'desc',
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.productsService.findAll({
      page,
      limit,
      sortBy,
      order,
      search,
      categoryId,
    });
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productsService.create(dto);
  }
}

import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto } from './create-product-dto';

interface FindAllProductsParams {
  page?: string;
  limit?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  search?: string;
  categoryId?: string;
}

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async findAll(params: FindAllProductsParams): Promise<{
    data: Product[];
    total: number;
    page: number;
    limit: number;
  }> {
    const {
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      order = 'desc',
      search,
      categoryId,
    } = params;

    const pageNumber = Math.max(parseInt(page), 1);
    const pageSize = Math.min(parseInt(limit), 100); // limit max 100

    // Build Prisma filters
    const filters: Prisma.ProductWhereInput = {};
    if (search) {
      filters.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (categoryId) {
      filters.categoryId = categoryId;
    }

    // Fetch data and total count
    const [data, total] = await Promise.all([
      this.prisma.product.findMany({
        where: filters,
        skip: (pageNumber - 1) * pageSize,
        take: pageSize,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.product.count({ where: filters }),
    ]);

    return {
      data,
      total,
      page: pageNumber,
      limit: pageSize,
    };
  }

  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        sku: dto.sku,
        barcode: dto.barcode,
        description: dto.description,
        productType: dto.productType,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
        costPrice: dto.costPrice ?? 0,
        salePrice: dto.salePrice ?? 0,
        currency: dto.currency ?? 'USD',
        uomId: dto.uomId,
        stockQty: dto.stockQty ?? 0,
        reorderLevel: dto.reorderLevel ?? 0,
        isActive: dto.isActive ?? true,
        taxCategoryId: dto.taxCategoryId,
        incomeAccountId: dto.incomeAccountId,
        expenseAccountId: dto.expenseAccountId,
        inventoryAccountId: dto.inventoryAccountId,
        defaultSupplierId: dto.defaultSupplierId,
        leadTimeDays: dto.leadTimeDays ?? 0,
        hasVariants: dto.hasVariants ?? false,
        parentId: dto.parentId,
      },
    });
  }
}

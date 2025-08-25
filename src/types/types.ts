export type ProductType = 'stockable' | 'consumable' | 'ser';
export interface ProductCategory {
  id: string;
  name: string;

  parentId?: string;
  parent?: ProductCategory;

  children?: ProductCategory[];
  products?: Product[];
}

export interface Brand {
  id: string;
  name: string;
  products: Product[];
}

export interface UnitOfMeasure {
  id: string;
  name: string;
  symbol: string;
  products: Product[];
}

export interface TaxCategory {
  id: string;
  name: string;
  products: Product[];
}

export interface Account {
  id: string;
  code: string;
  name: string;

  incomeProducts: Product[];
  expenseProducts: Product[];
  inventoryProducts: Product[];
}

export interface ProductVariant {
  id: string;
  productId: string;
  product: Product;

  sku: string;
  attributes: Record<string, any>; // Prisma Json → TS object

  costPrice: number; // Prisma Decimal → number (or Prisma.Decimal if you want strict typing)
  salePrice: number;
  stockQty: number;
}

export interface Supplier {
  id: string;
  name: string;
  contactInfo?: Record<string, any>; // Prisma Json → TS object (optional)
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  description?: string;
  productType: ProductType;

  categoryId?: string;
  category?: ProductCategory;

  brandId?: string;
  brand?: Brand;

  costPrice: number; // Prisma Decimal → TS number
  salePrice: number;
  currency: string;

  uomId?: string;
  uom?: UnitOfMeasure;
  stockQty: number;
  reorderLevel: number;
  isActive: boolean;

  taxCategoryId?: string;
  taxCategory?: TaxCategory;

  incomeAccountId?: string;
  incomeAccount?: Account;

  expenseAccountId?: string;
  expenseAccount?: Account;

  inventoryAccountId?: string;
  inventoryAccount?: Account;

  defaultSupplierId?: string;
  defaultSupplier?: Supplier;
  leadTimeDays: number;

  hasVariants: boolean;
  parentId?: string;
  variants: ProductVariant[];

  createdAt: Date;
  updatedAt: Date;
}

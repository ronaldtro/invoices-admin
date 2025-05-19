import { Product } from "./product.model";

export interface Invoice {
  id: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: string;
  products: Product[];
}

export interface InvoiceResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  invoiceDate: string;
  products: Product[];
}



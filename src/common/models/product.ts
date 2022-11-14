export interface ProductDetail {
  brand: string | number;
  color: string;
  model: number | string;
  price: number | string;
}

export interface ProductScheme {
  scheme: string | number;
  loan: number;
  downPayment: number;
  tenure: number;
  monthlyPaymentDate: Date;
  firstPaymentDate: Date;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  priceType: 'LTD' | 'Subscription';
  purchaseUrl: string;
}

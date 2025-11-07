export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  priceType: 'LTD' | 'Subscription';
  purchaseUrl: string;
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number; // 1-5
  comment: string;
}

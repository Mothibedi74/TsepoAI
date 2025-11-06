import type { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Workflow Automator Pro',
    description: 'A powerful no-code tool to automate your business workflows, connecting apps and services seamlessly.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop',
    price: 149,
    priceType: 'LTD',
    purchaseUrl: 'https://paypal.me/tsepomotsatse/149',
  },
  {
    id: '2',
    name: 'SiteBuilder One',
    description: 'Create stunning, responsive websites in minutes with a drag-and-drop interface. No coding required.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=800&auto=format&fit=crop',
    price: 29,
    priceType: 'Subscription',
    purchaseUrl: 'https://paypal.me/tsepomotsatse/29',
  },
  {
    id: '3',
    name: 'Appify Mobile',
    description: 'Turn your spreadsheet or idea into a fully functional mobile app for iOS and Android without writing code.',
    imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=800&auto=format&fit=crop',
    price: 297,
    priceType: 'LTD',
    purchaseUrl: 'https://paypal.me/tsepomotsatse/297',
  },
];

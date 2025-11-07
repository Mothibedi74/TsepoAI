import type { Product, Review } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Workflow Automator Pro',
    description: 'A powerful no-code tool to automate your business workflows, connecting apps and services seamlessly.',
    imageUrl: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop',
    price: 149,
    priceType: 'LTD',
    purchaseUrl: 'https://paypal.me/motsatsetsepo66/149',
  },
  {
    id: '2',
    name: 'SiteBuilder One',
    description: 'Create stunning, responsive websites in minutes with a drag-and-drop interface. No coding required.',
    imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=800&auto=format&fit=crop',
    price: 29,
    priceType: 'Subscription',
    purchaseUrl: 'https://paypal.me/motsatsetsepo66/29',
  },
  {
    id: '3',
    name: 'Appify Mobile',
    description: 'Turn your spreadsheet or idea into a fully functional mobile app for iOS and Android without writing code.',
    imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?q=80&w=800&auto=format&fit=crop',
    price: 297,
    priceType: 'LTD',
    purchaseUrl: 'https://paypal.me/motsatsetsepo66/297',
  },
];

export const INITIAL_REVIEWS: Review[] = [
    {
        id: 'r1',
        author: 'Sarah L.',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        rating: 5,
        comment: "Workflow Automator Pro has saved me countless hours. It's incredibly intuitive and powerful. A must-have for any small business owner!"
    },
    {
        id: 'r2',
        author: 'David Chen',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d',
        rating: 5,
        comment: "I launched my portfolio website with SiteBuilder One in under an hour. The templates are modern and the drag-and-drop editor is a breeze to use. Highly recommended!"
    },
    {
        id: 'r3',
        author: 'Maria Garcia',
        avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d',
        rating: 4,
        comment: "Appify Mobile is a game-changer. Turning a simple spreadsheet into a working app felt like magic. The support team was also very helpful."
    }
];

export const ANALYTICS_DATA = {
    sales: [
        { name: 'Jan', sales: 400 },
        { name: 'Feb', sales: 300 },
        { name: 'Mar', sales: 600 },
        { name: 'Apr', sales: 800 },
        { name: 'May', sales: 500 },
        { name: 'Jun', sales: 700 },
    ],
    products: [
        { name: 'Automator', sold: 45 },
        { name: 'SiteBuilder', sold: 82 },
        { name: 'Appify', sold: 31 },
    ]
};

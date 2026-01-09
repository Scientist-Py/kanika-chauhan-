
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'content' | 'call' | 'chat' | 'subscription' | 'service';
  description?: string;
  itemsCount?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

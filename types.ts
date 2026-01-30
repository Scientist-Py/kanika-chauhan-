
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: 'content' | 'call' | 'chat' | 'subscription' | 'service';
  description?: string;
  itemsCount?: string;
  isNew?: boolean;
  blur?: boolean;
  isHot?: boolean;
  priceOptions?: { label: string; price: number }[];
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

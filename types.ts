
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

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productTitle: string;
  amount: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
  customerTotalOrders: number;
  customerTotalLikes: number;
  isRepeated: boolean;
}

export interface AdminStats {
  totalOrdersToday: number;
  averageSalesPerDay: number;
  repeatedCustomerRate: number;
  mostSellingProduct: string;
  totalRevenue: number;
}

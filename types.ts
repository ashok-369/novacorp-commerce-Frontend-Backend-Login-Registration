
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

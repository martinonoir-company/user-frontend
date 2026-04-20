/**
 * Martinonoir API Client
 * Centralized HTTP client for the NestJS backend.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1';

interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
  correlationId: string;
}

class ApiClient {
  private accessToken: string | null = null;

  setToken(token: string | null) {
    this.accessToken = token;
  }

  getToken(): string | null {
    return this.accessToken;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }

    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        statusCode: response.status,
        message: response.statusText,
        error: 'Network Error',
        correlationId: 'unknown',
      }));
      throw error;
    }

    return response.json();
  }

  // ── Auth ──

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    countryCode: string;
  }) {
    return this.request<{ data: AuthResponse }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(email: string, password: string) {
    return this.request<{ data: AuthResponse }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async refreshToken(refreshToken: string) {
    return this.request<{ data: AuthResponse }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async logout(refreshToken: string) {
    return this.request<void>('/auth/logout', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async forgotPassword(email: string) {
    return this.request<void>('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return this.request<void>('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  }

  async verifyEmail(token: string) {
    return this.request<void>('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async resendVerification(email: string) {
    return this.request<void>('/auth/resend-verification', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // ── Products ──

  async getProducts(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    featured?: boolean;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.search) searchParams.set('search', params.search);
    if (params?.category) searchParams.set('categoryId', params.category);
    if (params?.featured) searchParams.set('isFeatured', 'true');

    const qs = searchParams.toString();
    return this.request<{ data: PaginatedProducts }>(`/products${qs ? `?${qs}` : ''}`);
  }

  async getProductBySlug(slug: string) {
    return this.request<{ data: Product }>(`/products/slug/${slug}`);
  }

  async getProductById(id: string) {
    return this.request<{ data: Product }>(`/products/${id}`);
  }

  // ── Quote ──

  async getQuote(items: QuoteItem[], context: QuoteContext) {
    return this.request<{ data: QuoteResult }>('/orders/quote', {
      method: 'POST',
      body: JSON.stringify({ items, context }),
    });
  }

  // ── Orders ──

  async checkout(data: CheckoutInput) {
    return this.request<{ data: Order }>('/orders/checkout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMyOrders(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    const qs = searchParams.toString();
    return this.request<{ data: PaginatedOrders }>(`/orders/mine${qs ? `?${qs}` : ''}`);
  }

  async getOrder(id: string) {
    return this.request<{ data: Order }>(`/orders/${id}`);
  }

  async getOrderByNumber(orderNumber: string) {
    return this.request<{ data: Order }>(`/orders/number/${orderNumber}`);
  }

  // ── Payments ──

  async initiatePayment(input: {
    orderId: string;
    orderNumber: string;
    amount: number;
    currency: string;
    customerEmail: string;
    customerName: string;
    provider?: string;
  }) {
    return this.request<{ data: { providerReference: string; checkoutUrl?: string; status: string; provider: string } }>('/payments/initiate', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async verifyPayment(providerReference: string, provider: string) {
    return this.request<{ data: { status: string; amount: number } }>('/payments/verify', {
      method: 'POST',
      body: JSON.stringify({ providerReference, provider }),
    });
  }

  // ── Shipping ──

  async getShippingRates(input: { country: string; state: string; weightKg: number; currency: string; subtotal: number }) {
    return this.request<{ data: Array<{ carrier: string; service: string; estimatedDays: { min: number; max: number }; rate: number; currency: string }> }>('/shipping/rates', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  }

  async trackShipment(trackingNumber: string) {
    return this.request<{ data: { trackingNumber: string; carrier: string; currentStatus: string; events: Array<{ timestamp: string; status: string; location: string; description: string }> } }>(`/shipping/track/${trackingNumber}`);
  }

  // ── Inventory ──

  async getStockLevel(variantId: string) {
    return this.request<{ data: StockLevel }>(`/inventory/levels/${variantId}`);
  }

  // ── Categories ──

  async getCategories() {
    return this.request<{ data: Category[] }>('/categories');
  }

  async getCategoryTree() {
    return this.request<{ data: Category[] }>('/categories/tree');
  }

  async getCategoryBySlug(slug: string) {
    return this.request<{ data: Category }>(`/categories/slug/${slug}`);
  }

  // ── Wishlist ──

  async getWishlist() {
    return this.request<{ data: WishlistItem[] }>('/wishlist');
  }

  async getWishlistCount() {
    return this.request<{ data: { count: number } }>('/wishlist/count');
  }

  async checkWishlisted(productIds: string[]) {
    const qs = productIds.join(',');
    return this.request<{ data: { wishlisted: string[] } }>(`/wishlist/check?productIds=${qs}`);
  }

  async addToWishlist(productId: string, variantId?: string) {
    return this.request<{ data: WishlistItem }>('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId, variantId }),
    });
  }

  async removeFromWishlist(productId: string) {
    return this.request<{ message: string }>(`/wishlist/${productId}`, {
      method: 'DELETE',
    });
  }

  async clearWishlist() {
    return this.request<{ message: string }>('/wishlist', {
      method: 'DELETE',
    });
  }

  // ── Cart (authenticated only) ──

  async getCart() {
    return this.request<{ data: ServerCartItem[] }>('/cart');
  }

  async getCartCount() {
    return this.request<{ data: { count: number } }>('/cart/count');
  }

  async addToCart(variantId: string, quantity: number) {
    return this.request<{ data: ServerCartItem }>('/cart', {
      method: 'POST',
      body: JSON.stringify({ variantId, quantity }),
    });
  }

  async updateCartQuantity(variantId: string, quantity: number) {
    return this.request<{ data: ServerCartItem | null }>(`/cart/${variantId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeFromCart(variantId: string) {
    return this.request<{ message: string }>(`/cart/${variantId}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request<{ message: string }>('/cart', {
      method: 'DELETE',
    });
  }

  async mergeCart(items: { variantId: string; quantity: number }[]) {
    return this.request<{ data: ServerCartItem[] }>('/cart/merge', {
      method: 'POST',
      body: JSON.stringify({ items }),
    });
  }

  // ── Account ──

  async getProfile() {
    return this.request<{ data: UserProfile }>('/account/profile');
  }

  async updateProfile(data: { firstName?: string; lastName?: string; phone?: string; countryCode?: string }) {
    return this.request<{ data: UserProfile }>('/account/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/account/password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }
}

// ── Types ──

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  isActive: boolean;
  isFeatured: boolean;
  categoryId: string | null;
  category: Category | null;
  attributes: Record<string, unknown> | null;
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  variants: ProductVariant[];
  media: ProductMedia[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  retailPriceNgn: string;
  retailPriceUsd: string;
  wholesalePriceNgn: string;
  wholesalePriceUsd: string;
  compareAtPriceNgn: string | null;
  compareAtPriceUsd: string | null;
  costPriceNgn: string | null;
  weightKg: string | null;
  isActive: boolean;
  trackInventory: boolean;
  options: Record<string, string>;
  barcode: string | null;
  sortOrder: number;
}

export interface ProductMedia {
  id: string;
  url: string;
  alt: string;
  type: string;
  sortOrder: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  alias?: string;
  description?: string;
  imageUrl?: string;
  sortOrder: number;
  isActive: boolean;
  children?: Category[];
}

export interface PaginatedProducts {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface QuoteItem {
  variantId: string;
  sku: string;
  productName: string;
  variantName?: string;
  quantity: number;
  unitPrice: number;
  compareAtPrice?: number;
  weightKg?: number;
}

export interface QuoteContext {
  currency: string;
  country: string;
  state: string;
  couponCode?: string;
  shippingMethod?: string;
}

export interface QuoteResult {
  currency: string;
  lines: Array<{
    variantId: string;
    sku: string;
    productName: string;
    variantName?: string;
    quantity: number;
    unitPrice: number;
    lineSubtotal: number;
    lineDiscount: number;
    lineTotal: number;
  }>;
  subtotal: number;
  discountTotal: number;
  coupon?: { code: string; discountType: string; discountAmount: number };
  shippingTotal: number;
  shippingMethod?: { carrier: string; service: string; estimatedDays: { min: number; max: number }; rate: number };
  availableShippingRates: Array<{ carrier: string; service: string; estimatedDays: { min: number; max: number }; rate: number; currency: string }>;
  taxTotal: number;
  grandTotal: number;
  savings: number;
  itemCount: number;
}

export interface CheckoutInput {
  items: Array<{ variantId: string; quantity: number }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    phone?: string;
  };
  currency?: string;
  paymentMethod?: string;
  couponCode?: string;
  customerNote?: string;
  guestEmail?: string;
  idempotencyKey?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: string;
  channel: string;
  currency: string;
  subtotal: string;
  discountTotal: string;
  shippingTotal: string;
  taxTotal: string;
  grandTotal: string;
  shippingAddress: Record<string, string>;
  items: OrderItem[];
  statusHistory: Array<{ fromStatus: string; toStatus: string; reason: string; createdAt: string }>;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  variantId: string;
  productName: string;
  variantName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  options: Record<string, string>;
}

export interface PaginatedOrders {
  items: Order[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface StockLevel {
  variantId: string;
  warehouseCode: string;
  onHand: number;
  reserved: number;
}

export interface ServerCartItem {
  id: string;
  variantId: string | null;
  productId: string | null;
  productName: string;
  productSlug: string;
  variantName: string | null;
  sku: string;
  quantity: number;
  priceNgn: number;
  priceUsd: number;
  currentPriceNgn: number | null;
  currentPriceUsd: number | null;
  priceChanged: boolean;
  unavailable: boolean;
  options: Record<string, string> | null;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  variantId?: string;
  note?: string;
  product: Product;
  variant?: ProductVariant;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  countryCode: string;
  preferredCurrency: 'NGN' | 'USD';
  emailVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
}

// ── Singleton ──
export const api = new ApiClient();
export default api;


/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  long_description?: string;
  price: number;
  category: 'All' | 'Totes' | 'Shoulder bags' | 'Heels' | 'Charms' | 'Clutches' | 'Satchels' | 'Crossbody' | 'Bucket' | 'Weekender' | 'New Arrival';
  image_url: string;
  gallery?: string[];
  features: string[];
  created_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type UserRole = 'admin' | 'client';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  is_approved: boolean;
  created_at: string;
}

export interface Review {
  id: string;
  product_id?: string;
  customer_name: string;
  rating: number;
  comment: string;
  status: 'pending' | 'published';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read';
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url: string;
  author_id: string;
  created_at: string;
  author_name?: string;
  slug?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface SiteSettings {
  id: number;
  phone: string;
  email: string;
  address: string;
  instagram_url?: string;
  facebook_url?: string;
  whatsapp_number?: string;
  whatsapp_group_url?: string;
  tiktok_url?: string;
  updated_at: string;
}

export interface Order {
  id: string;
  customer_id?: string;
  phone_number: string;
  amount: number;
  items: any[];
  shipping_address?: any;
  status: 'pending' | 'paid' | 'failed' | 'completed';
  mpesa_receipt_number?: string;
  checkout_request_id?: string;
  notes?: string;
  payment_date?: string;
  created_at: string;
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'product', product: Product }
  | { type: 'journal', article: BlogPost }
  | { type: 'checkout' }
  | { type: 'contact' }
  | { type: 'admin' }
  | { type: 'orders' }
  | { type: 'reviews' };

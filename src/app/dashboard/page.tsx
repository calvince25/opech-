"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Package, Star, ExternalLink, BookOpen, LogOut, User, ChevronRight, Clock } from 'lucide-react';

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  items: any[];
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          window.location.href = '/auth/login?redirect=/dashboard';
          return;
        }
        setUser(session.user);

        const { data: orderData } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (orderData) setOrders(orderData);
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2EB] pt-32 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-stone-900 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-stone-500 font-light text-sm">Loading your account...</p>
        </div>
      </div>
    );
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Valued Customer';

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-2 block">Welcome Back</span>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-950">Hello, {firstName} 👋</h1>
            <p className="text-stone-500 font-light mt-2">{user?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors border border-stone-200 rounded-xl px-4 py-2.5 bg-white"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Orders', value: orders.length, icon: Package },
            { label: 'Active Orders', value: orders.filter(o => o.status === 'processing').length, icon: Clock },
            { label: 'Loyalty Points', value: orders.reduce((s, o) => s + Math.floor((o.total_amount || 0) / 100), 0), icon: Star },
            { label: 'Member Since', value: new Date(user?.created_at || Date.now()).getFullYear(), icon: User },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
              <Icon className="w-5 h-5 text-stone-400 mb-3" />
              <p className="text-2xl font-serif text-stone-900">{value}</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Orders */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                <h2 className="font-serif text-xl text-stone-900">Recent Orders</h2>
                <Link href="/shop" className="text-[10px] font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors">
                  Shop Again →
                </Link>
              </div>
              <div className="divide-y divide-stone-50">
                {orders.length === 0 ? (
                  <div className="px-8 py-16 text-center">
                    <Package className="w-10 h-10 text-stone-200 mx-auto mb-4" />
                    <p className="text-stone-400 font-light text-sm">No orders yet. Start shopping!</p>
                    <Link
                      href="/shop"
                      className="mt-6 inline-block bg-stone-900 text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-colors"
                    >
                      Browse Collection
                    </Link>
                  </div>
                ) : orders.map(order => (
                  <div key={order.id} className="px-8 py-6 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">Order #{order.id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-stone-400 font-light mt-1">{new Date(order.created_at).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900">KSh {(order.total_amount || 0).toLocaleString()}</p>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mt-1 inline-block ${
                        order.status === 'delivered' ? 'bg-green-50 text-green-700' :
                        order.status === 'processing' ? 'bg-yellow-50 text-yellow-700' :
                        'bg-stone-50 text-stone-600'
                      }`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-stone-100">
                <h2 className="font-serif text-xl text-stone-900">Quick Links</h2>
              </div>
              <div className="divide-y divide-stone-50">
                {[
                  { label: 'Browse New Arrivals', href: '/shop/new-arrivals', icon: Package },
                  { label: 'Leather Care Guides', href: '/knowledge-hub?category=leather-care', icon: BookOpen },
                  { label: 'Buying Guides', href: '/knowledge-hub?category=buying-guides', icon: BookOpen },
                  { label: 'Contact Support', href: '/contact', icon: User },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href} className="px-8 py-5 flex items-center justify-between gap-4 hover:bg-stone-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-stone-400" />
                      <span className="text-sm text-stone-700 font-light group-hover:text-stone-900 transition-colors">{label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-stone-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Google Review QR Prompt */}
          <div className="space-y-6">
            <div className="bg-stone-900 rounded-3xl p-8 text-white space-y-6 shadow-sm">
              <div>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-serif text-2xl text-white leading-tight">Love your bag?</h3>
                <p className="text-stone-300 font-light text-sm mt-2 leading-relaxed">
                  A quick Google review helps hundreds of Nairobi women discover genuine leather craftsmanship.
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-3 flex items-center justify-center mx-auto w-36 h-36">
                <img 
                  src="/google-review-qr.png" 
                  alt="Google Review QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>

              <a
                href="https://g.page/r/CQSxu8eF3_qjEBI/review"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasReviewed(true)}
                className="flex items-center justify-center gap-2 w-full bg-white text-stone-900 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-stone-100 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {hasReviewed ? 'Thank You! 🙏' : 'Leave a Review'}
              </a>
            </div>

            {/* Reading Recommendation */}
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-8 space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-stone-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Care Tips</span>
              </div>
              <h3 className="font-serif text-lg text-stone-900">Keep Your Bag Beautiful</h3>
              <p className="text-stone-500 font-light text-xs leading-relaxed">
                Learn how to clean, condition, and store your new leather bag so it lasts decades.
              </p>
              <Link
                href="/knowledge-hub/how-to-clean-leather-bags"
                className="text-[10px] font-bold uppercase tracking-widest text-stone-900 hover:text-stone-600 transition-colors border-b border-stone-900 pb-0.5 inline-block"
              >
                Read Leather Care Guide →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

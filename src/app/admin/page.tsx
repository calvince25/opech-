"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, Users, Settings, Plus, Search, 
  MoreVertical, TrendingUp, Package, DollarSign, Star, FileText, 
  Check, X, Loader2, Mail, Trash2, Edit2, ShieldCheck 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Profile, BlogPost, Review, ContactMessage, Product, SiteSettings } from '@/types';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminPage() {
  const { user, profile, loading: authLoading, isAdmin } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading) {
      if (!user || !isAdmin) {
        router.push('/auth');
      } else {
        fetchData();
      }
    }
  }, [user, isAdmin, authLoading]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profilesRes, blogRes, productsRes, reviewsRes, messagesRes, ordersRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('orders').select('*').order('created_at', { ascending: false })
      ]);

      if (profilesRes.data) setProfiles(profilesRes.data);
      if (blogRes.data) setBlogPosts(blogRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (reviewsRes.data) setReviews(reviewsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-stone-900" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const stats = [
    { label: 'Total Revenue', value: `KES ${orders.filter(o => o.status === 'paid' || o.status === 'completed').reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Inventory', value: products.length.toString(), icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Clients', value: profiles.length.toString(), icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  return (
    <div className="pt-24 min-h-screen flex bg-[#f0f0f1]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1d2327] hidden lg:flex flex-col fixed top-16 bottom-0 left-0 z-20">
        <div className="px-6 py-8 border-b border-white/10">
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">Admin Dashboard</h2>
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-bold">WP-Style Management</p>
        </div>
        <nav className="flex-1 py-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'blog', label: 'Posts', icon: FileText },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'messages', label: 'Inquiries', icon: Mail },
            { id: 'customers', label: 'Users', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-[#2271b1] text-white' 
                  : 'text-[#a7aaad] hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 lg:ml-64 p-8 md:p-12">
        <header className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-serif text-stone-900 capitalize">{activeTab}</h1>
          <div className="flex gap-4">
             {activeTab === 'products' && (
               <button className="px-6 py-2 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all">+ Add Product</button>
             )}
             {activeTab === 'blog' && (
               <button className="px-6 py-2 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all">+ Write Post</button>
             )}
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dash"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4_gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
                    <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
                 <div className="px-8 py-6 border-b border-stone-100 flex items-center justify-between">
                    <h3 className="text-lg font-serif">Recent Orders</h3>
                    <button className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">View Journal</button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                        <tr>
                          <th className="px-8 py-4">ID</th>
                          <th className="px-8 py-4">Phone</th>
                          <th className="px-8 py-4">Items</th>
                          <th className="px-8 py-4">Amount</th>
                          <th className="px-8 py-4">Status</th>
                          <th className="px-8 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 italic font-serif">
                        {orders.slice(0, 5).map(order => (
                          <tr key={order.id} className="hover:bg-stone-50 transition-all">
                            <td className="px-8 py-5 text-stone-400">{order.id.slice(0, 8)}</td>
                            <td className="px-8 py-5 text-stone-900">{order.phone_number}</td>
                            <td className="px-8 py-5 text-stone-500 max-w-xs truncate">
                              {order.items?.map((i: any) => i.name).join(', ')}
                            </td>
                            <td className="px-8 py-5 font-bold text-stone-900">KES {order.amount.toLocaleString()}</td>
                            <td className="px-8 py-5">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-8 py-5">
                               <button className="text-stone-400 hover:text-stone-900"><MoreVertical className="w-4 h-4" /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-12 rounded-3xl border border-stone-200 shadow-sm"
            >
              <h2 className="text-2xl font-serif mb-8 text-stone-900">Site Configuration</h2>
              <form className="space-y-8 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Contact Email</label>
                    <input type="email" placeholder="hello@mellsfasion.co.ke" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone</label>
                    <input type="text" placeholder="+254..." className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Headquarters Address</label>
                  <input type="text" placeholder="Kilimani, Nairobi, Kenya" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400" />
                </div>

                <div className="border-t border-stone-100 pt-8 mt-8">
                  <h3 className="text-lg font-serif mb-6 text-stone-900">Appearance & Media</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Home Header Image URL</label>
                      <input type="text" defaultValue="https://www.shutterstock.com/image-photo/set-stylish-female-clothes-accessories-600nw-2696516961.jpg" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Shop Header Image URL</label>
                      <input type="text" defaultValue="https://images.unsplash.com/photo-1591561954557-26941169b49e" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">About Header Image URL</label>
                      <input type="text" defaultValue="https://images.unsplash.com/photo-1543163521-1bf539c55dd2" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Contact Header Image URL</label>
                      <input type="text" defaultValue="https://images.unsplash.com/photo-1490481651871-ab68de25d43d" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Journal Header Image URL</label>
                      <input type="text" defaultValue="https://images.unsplash.com/photo-1445205170230-053b83016050" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-stone-400 font-mono text-xs" />
                    </div>
                  </div>
                </div>

                <button type="button" className="bg-[#2271b1] text-white px-8 py-3 rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] transition-all">Save Configuration</button>
              </form>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <div className="px-10 py-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                <div>
                   <h2 className="text-2xl font-serif text-stone-900">Order Management</h2>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-2">Process and track customer purchases</p>
                </div>
                <div className="flex gap-4">
                   <button onClick={fetchData} className="p-3 bg-white border border-stone-200 rounded-xl hover:bg-stone-50 transition-all">
                      <TrendingUp className="w-4 h-4 text-stone-400" />
                   </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px] border-b border-stone-100">
                    <tr>
                      <th className="px-10 py-6">Reference</th>
                      <th className="px-10 py-6">Customer / Phone</th>
                      <th className="px-10 py-6">Items</th>
                      <th className="px-10 py-6">Total Amount</th>
                      <th className="px-10 py-6">Payment Status</th>
                      <th className="px-10 py-6">Date</th>
                      <th className="px-10 py-6">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/50 transition-all group">
                        <td className="px-10 py-8">
                           <span className="font-mono text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded">#{order.id.slice(0, 8)}</span>
                        </td>
                        <td className="px-10 py-8">
                           <div className="space-y-1">
                              <p className="font-bold text-stone-900">{order.phone_number}</p>
                              {order.shipping_address?.email && <p className="text-[10px] text-stone-400 lowercase">{order.shipping_address.email}</p>}
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex -space-x-3 overflow-hidden">
                              {order.items?.map((item: any, i: number) => (
                                <div key={i} className="relative group/item z-0 hover:z-10">
                                   <img 
                                     src={item.image_url} 
                                     className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm bg-stone-100" 
                                     title={item.name}
                                   />
                                </div>
                              ))}
                              {order.items?.length > 3 && (
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[10px] font-bold text-stone-400 shadow-sm">
                                   +{order.items.length - 3}
                                </div>
                              )}
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <p className="font-serif font-bold text-stone-900 text-lg">KES {order.amount.toLocaleString()}</p>
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex flex-col gap-2">
                              <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit ${
                                order.status === 'paid' ? 'bg-green-100 text-green-700' : 
                                order.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                                order.status === 'failed' ? 'bg-red-100 text-red-700' :
                                'bg-amber-100 text-amber-700'
                              }`}>
                                {order.status === 'paid' && <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                                {order.status}
                              </span>
                              {order.mpesa_receipt_number && <span className="text-[9px] font-mono text-stone-400">{order.mpesa_receipt_number}</span>}
                           </div>
                        </td>
                        <td className="px-10 py-8 text-stone-400 text-xs italic font-serif">
                           {new Date(order.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-10 py-8">
                           <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              {order.status === 'paid' && (
                                <button 
                                  onClick={async () => {
                                      const { error } = await supabase.from('orders').update({ status: 'completed' }).eq('id', order.id);
                                      if (!error) fetchData();
                                  }}
                                  className="p-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-all shadow-lg"
                                  title="Mark Completed"
                                >
                                   <Check className="w-4 h-4" />
                                </button>
                              )}
                              <button className="p-3 bg-white border border-stone-200 text-stone-400 rounded-xl hover:text-stone-900 transition-all">
                                 <Edit2 className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-10 py-20 text-center">
                           <ShoppingBag className="w-12 h-12 text-stone-100 mx-auto mb-6" />
                           <p className="text-xl font-serif text-stone-300 italic">No orders recorded yet.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Other tabs would go here, following the same premium aesthetic */}
          {activeTab !== 'dashboard' && activeTab !== 'settings' && activeTab !== 'orders' && (
            <motion.div 
              key="other"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-20 rounded-3xl border border-stone-200 border-dashed text-center"
            >
               <ShieldCheck className="w-12 h-12 text-stone-200 mx-auto mb-6" />
               <p className="text-xl font-serif text-stone-400 italic">Detailed {activeTab} management is coming in the next release.</p>
               <p className="text-xs font-bold uppercase tracking-widest text-stone-300 mt-4">Feature Locked</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

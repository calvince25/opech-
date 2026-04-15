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

  // CRUD States
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  // File Upload State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Form States
  const [productForm, setProductForm] = useState({ name: '', price: 0, category: 'All', image_url: '', description: '', tagline: '' });
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', content: '', image_url: '', meta_title: '', meta_description: '' });

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
    { id: 'orders', label: 'Total Revenue', value: `KES ${orders.filter(o => o.status === 'paid' || o.status === 'completed').reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 'orders', label: 'Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'products', label: 'Inventory', value: products.length.toString(), icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'customers', label: 'Clients', value: profiles.length.toString(), icon: Users, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const handleStatClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('saving_product');
    setUploading(true);
    
    try {
      let finalImageUrl = productForm.image_url;

      // Handle File Upload if selected
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('products')
          .upload(filePath, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('products')
          .getPublicUrl(filePath);
        
        finalImageUrl = publicUrl;
      }

      const productData = { ...productForm, image_url: finalImageUrl };

      const { error } = editingProduct 
        ? await supabase.from('products').update(productData).eq('id', editingProduct.id)
        : await supabase.from('products').insert([productData]);
      
      if (!error) {
        setShowProductModal(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        fetchData();
      } else {
        throw error;
      }
    } catch (err: any) {
      alert('Error: ' + err.message);
    } finally {
      setActionLoading(null);
      setUploading(false);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('saving_blog');
    
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const data = { ...blogForm, slug, author_id: user.id };

    const { error } = editingBlog
      ? await supabase.from('blog_posts').update(data).eq('id', editingBlog.id)
      : await supabase.from('blog_posts').insert([data]);
    
    if (!error) {
      setShowBlogModal(false);
      fetchData();
    } else {
      alert(error.message);
    }
    setActionLoading(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to permanently delete this order? This action cannot be undone.')) return;
    
    setActionLoading('deleting_order');
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    
    if (!error) {
      fetchData();
    } else {
      alert('Error deleting order: ' + error.message);
    }
    setActionLoading(null);
  };

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
          <h1 className="text-3xl font-serif text-stone-900 capitalize font-bold tracking-tight">{activeTab}</h1>
          <div className="flex gap-4">
             {activeTab === 'products' && (
               <button 
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: '', price: 0, category: 'All', image_url: '', description: '', tagline: '' });
                  setSelectedFile(null);
                  setPreviewUrl(null);
                  setShowProductModal(true);
                }}
                className="px-6 py-2 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] shadow-sm transition-all"
               >
                 + Add Product
               </button>
             )}
             {activeTab === 'blog' && (
               <button 
                onClick={() => {
                  setEditingBlog(null);
                  setBlogForm({ title: '', slug: '', excerpt: '', content: '', image_url: '', meta_title: '', meta_description: '' });
                  setShowBlogModal(true);
                }}
                className="px-6 py-2 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] shadow-sm transition-all"
               >
                 + Write Post
               </button>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <button 
                    key={stat.label} 
                    onClick={() => handleStatClick(stat.id)}
                    className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 text-left hover:border-stone-400 hover:shadow-md transition-all group"
                  >
                    <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
                    </div>
                  </button>
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
                              <p className="font-bold text-stone-900">{order.shipping_address?.firstName} {order.shipping_address?.lastName}</p>
                              <p className="text-xs text-[#2271b1] font-mono">{order.phone_number}</p>
                              {order.shipping_address?.email && <p className="text-[10px] text-stone-400 lowercase">{order.shipping_address.email}</p>}
                           </div>
                        </td>
                        <td className="px-10 py-8">
                           <div className="space-y-2">
                              {order.items?.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-3">
                                   <img src={item.image_url} className="w-8 h-8 rounded border border-stone-100 object-cover" />
                                   <div>
                                      <p className="text-[11px] font-bold text-stone-900 leading-none">{item.name}</p>
                                      <p className="text-[9px] text-stone-400 uppercase tracking-widest mt-1">QTY: 1</p>
                                   </div>
                                </div>
                              ))}
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
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-3 bg-white border border-stone-200 text-stone-400 hover:text-red-600 rounded-xl transition-all"
                                title="Permanently Delete Order"
                              >
                                 <Trash2 className="w-4 h-4" />
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

          {activeTab === 'products' && (
            <motion.div 
              key="products"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr>
                      <th className="px-10 py-6">Product</th>
                      <th className="px-10 py-6">Category</th>
                      <th className="px-10 py-6">Price</th>
                      <th className="px-10 py-6">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 italic font-serif">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-stone-50 transition-all">
                        <td className="px-10 py-6 flex items-center gap-4">
                          <img src={product.image_url} className="w-12 h-12 rounded object-cover" />
                          <span className="text-stone-900 font-bold">{product.name}</span>
                        </td>
                        <td className="px-10 py-6 text-stone-500 lowercase">{product.category}</td>
                        <td className="px-10 py-6 font-bold text-stone-900">KES {product.price.toLocaleString()}</td>
                        <td className="px-10 py-6 flex gap-3">
                          <button 
                            onClick={() => {
                              setEditingProduct(product);
                              setProductForm({ 
                                name: product.name, 
                                price: Number(product.price), 
                                category: product.category, 
                                image_url: product.image_url, 
                                description: product.description || '', 
                                tagline: product.tagline || '' 
                              });
                              setShowProductModal(true);
                            }}
                            className="text-stone-400 hover:text-[#2271b1] p-2 hover:bg-stone-100 rounded-lg transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={async () => {
                              if (confirm('Delete this product?')) {
                                await supabase.from('products').delete().eq('id', product.id);
                                fetchData();
                              }
                            }}
                            className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'blog' && (
            <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr><th className="px-10 py-6">Title</th><th className="px-10 py-6">Date</th><th className="px-10 py-6">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {blogPosts.map(post => (
                      <tr key={post.id}>
                        <td className="px-10 py-6 font-bold text-stone-900">{post.title}</td>
                        <td className="px-10 py-6 text-stone-400">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="px-10 py-6 flex gap-4">
                           <button 
                            onClick={() => {
                              setEditingBlog(post);
                              setBlogForm({
                                title: post.title,
                                slug: post.slug || '',
                                excerpt: post.excerpt || '',
                                content: post.content || '',
                                image_url: post.image_url || '',
                                meta_title: post.meta_title || '',
                                meta_description: post.meta_description || ''
                              });
                              setShowBlogModal(true);
                            }}
                            className="text-stone-400 hover:text-[#2271b1] p-2 hover:bg-stone-100 rounded-lg transition-all"
                           >
                             <Edit2 className="w-4 h-4" />
                           </button>
                           <button 
                            onClick={async () => { if(confirm('Delete post?')){ await supabase.from('blog_posts').delete().eq('id', post.id); fetchData(); }}} 
                            className="text-stone-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-stone-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr><th className="px-10 py-6">Customer</th><th className="px-10 py-6">Rating</th><th className="px-10 py-6">Status</th><th className="px-10 py-6">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {reviews.map(review => (
                      <tr key={review.id}>
                        <td className="px-10 py-6 font-bold text-stone-900">{review.customer_name}</td>
                        <td className="px-10 py-6 text-amber-500 font-bold">★ {review.rating}</td>
                        <td className="px-10 py-6">
                           <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${review.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                             {review.status}
                           </span>
                        </td>
                        <td className="px-10 py-6 flex gap-4">
                           {review.status === 'pending' && (
                             <button onClick={async () => { await supabase.from('reviews').update({status: 'published'}).eq('id', review.id); fetchData(); }} className="text-stone-400 hover:text-green-600"><Check className="w-4 h-4" /></button>
                           )}
                           <button onClick={async () => { if(confirm('Delete review?')){ await supabase.from('reviews').delete().eq('id', review.id); fetchData(); }}} className="text-stone-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr><th className="px-10 py-6">From</th><th className="px-10 py-6">Message</th><th className="px-10 py-6">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {messages.map(msg => (
                      <tr key={msg.id} className={msg.status === 'unread' ? 'bg-stone-50' : ''}>
                        <td className="px-10 py-6">
                           <p className="font-bold text-stone-900">{msg.name}</p>
                           <p className="text-[10px] text-stone-400 uppercase tracking-widest">{msg.email}</p>
                           <p className="text-[10px] text-stone-300 mt-1 italic">{new Date(msg.created_at).toLocaleString()}</p>
                        </td>
                        <td className="px-10 py-6 text-stone-600">
                           <p className="font-bold text-stone-900 mb-1">{msg.subject}</p>
                           <p className="max-w-md line-clamp-2">{msg.message}</p>
                        </td>
                        <td className="px-10 py-6 flex gap-3">
                           {msg.status === 'unread' && (
                             <button 
                                onClick={async () => { await supabase.from('contact_messages').update({status: 'read'}).eq('id', msg.id); fetchData(); }} 
                                className="p-2 text-stone-400 hover:text-[#2271b1] hover:bg-stone-100 rounded-lg transition-all"
                                title="Mark as Read"
                             >
                               <Check className="w-4 h-4" />
                             </button>
                           )}
                           <button 
                            onClick={async () => { if(confirm('Delete message?')){ await supabase.from('contact_messages').delete().eq('id', msg.id); fetchData(); }}} 
                            className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Message"
                           >
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </motion.div>
          )}

          {activeTab === 'customers' && (
            <motion.div key="customers" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-bold uppercase tracking-widest text-[10px]">
                    <tr><th className="px-10 py-6">User Details</th><th className="px-10 py-6">Role</th><th className="px-10 py-6">Status</th><th className="px-10 py-6">Actions</th></tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {profiles.map(p => (
                      <tr key={p.id} className="hover:bg-stone-50/50 transition-all">
                        <td className="px-10 py-6">
                           <p className="font-bold text-stone-900">{p.email}</p>
                           <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest italic">{p.id.slice(0, 8)}</p>
                        </td>
                        <td className="px-10 py-6">
                           <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest ${p.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-stone-100 text-stone-500'}`}>
                             {p.role}
                           </span>
                        </td>
                        <td className="px-10 py-6">
                           <button 
                             onClick={async () => {
                               await supabase.from('profiles').update({is_approved: !p.is_approved}).eq('id', p.id);
                               fetchData();
                             }}
                             className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${p.is_approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'}`}
                           >
                             {p.is_approved ? 'Approved' : 'Pending Approval'}
                           </button>
                        </td>
                        <td className="px-10 py-6 flex gap-3">
                           <button 
                             onClick={async () => {
                               const newRole = p.role === 'admin' ? 'client' : 'admin';
                               if (confirm(`Change ${p.email} role to ${newRole}?`)) {
                                 await supabase.from('profiles').update({role: newRole}).eq('id', p.id);
                                 fetchData();
                               }
                             }}
                             className={`p-2 rounded-lg transition-all ${p.role === 'admin' ? 'text-purple-600 bg-purple-50 hover:bg-purple-100' : 'text-stone-400 hover:text-stone-900 hover:bg-stone-100'}`}
                             title={p.role === 'admin' ? 'Demote from Admin' : 'Promote to Admin'}
                           >
                             <ShieldCheck className="w-4 h-4" />
                           </button>
                           {p.id !== user.id && (
                             <button 
                               onClick={async () => { if(confirm('Permanently delete this user profile?')){ await supabase.from('profiles').delete().eq('id', p.id); fetchData(); }}} 
                               className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                               title="Delete User"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
                           )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Modal */}
        <AnimatePresence>
          {showProductModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowProductModal(false)} className="absolute inset-0 bg-[#f0f0f1]/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
                <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                  <h3 className="text-2xl font-serif text-stone-900">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <button onClick={() => setShowProductModal(false)} className="text-stone-400 hover:text-stone-900"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSaveProduct} className="p-10 space-y-6 max-h-[70vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Product Name</label>
                      <input required type="text" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1]" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Price (KES)</label>
                       <input required type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: Number(e.target.value)})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1]">
                      {['All', 'Heels', 'Charms', 'Shoulder bags', 'Wallets', 'Leather Handbags', 'Crossbody Bags', 'Tote Bags', 'Clutch Bags', 'Sale', 'New Arrivals'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Product Image</label>
                    <div className="flex items-center gap-6">
                       <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-stone-200 rounded-2xl h-32 hover:border-[#2271b1] cursor-pointer bg-stone-50 transition-all overflow-hidden group">
                          {previewUrl || productForm.image_url ? (
                             <img src={previewUrl || productForm.image_url} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
                          ) : (
                             <div className="flex flex-col items-center text-stone-400">
                                <Plus className="w-6 h-6 mb-2" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Select Photo</span>
                             </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={e => {
                               const file = e.target.files?.[0];
                               if (file) {
                                  setSelectedFile(file);
                                  setPreviewUrl(URL.createObjectURL(file));
                               }
                            }} 
                          />
                       </label>
                       {(previewUrl || productForm.image_url) && (
                         <div className="flex-1 space-y-2">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Direct Link fallback</p>
                            <input type="text" value={productForm.image_url} onChange={e => setProductForm({...productForm, image_url: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-2 rounded text-xs outline-none focus:border-[#2271b1]" placeholder="Or paste URL..." />
                         </div>
                       )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Description</label>
                    <textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] h-32" />
                  </div>
                  <div className="pt-6 border-t border-stone-100 flex justify-end gap-4">
                     <button type="button" onClick={() => setShowProductModal(false)} className="px-8 py-3 rounded font-bold text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all">Cancel</button>
                     <button type="submit" disabled={!!actionLoading} className="px-8 py-3 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] shadow-lg transition-all flex items-center gap-2">
                        {actionLoading === 'saving_product' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Product'}
                     </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Blog Modal */}
        <AnimatePresence>
          {showBlogModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowBlogModal(false)} className="absolute inset-0 bg-[#f0f0f1]/80 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
                <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                  <h3 className="text-2xl font-serif text-stone-900">{editingBlog ? 'Edit Post' : 'Write New Post'}</h3>
                  <button onClick={() => setShowBlogModal(false)} className="text-stone-400 hover:text-stone-900"><X className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSaveBlog} className="p-10 space-y-6 max-h-[80vh] overflow-y-auto">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Post Title</label>
                        <input required type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] text-lg font-bold" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Slug (URL)</label>
                        <input type="text" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} placeholder="auto-generated-if-empty" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] font-mono text-xs" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Featured Image URL</label>
                        <input required type="text" value={blogForm.image_url} onChange={e => setBlogForm({...blogForm, image_url: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1]" />
                      </div>
                    </div>
                    <div className="space-y-6">
                       <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Meta Title</label>
                        <input type="text" value={blogForm.meta_title} onChange={e => setBlogForm({...blogForm, meta_title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1]" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Meta Description</label>
                        <textarea value={blogForm.meta_description} onChange={e => setBlogForm({...blogForm, meta_description: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] h-20" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Excerpt</label>
                    <textarea value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] h-20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Post Content</label>
                    <textarea required value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full bg-stone-50 border border-stone-200 px-4 py-3 rounded outline-none focus:border-[#2271b1] h-64 font-serif leading-relaxed" />
                  </div>
                  <div className="pt-6 border-t border-stone-100 flex justify-end gap-4">
                     <button type="button" onClick={() => setShowBlogModal(false)} className="px-8 py-3 rounded font-bold text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all">Cancel</button>
                     <button type="submit" disabled={!!actionLoading} className="px-10 py-4 bg-[#2271b1] text-white rounded font-bold text-xs uppercase tracking-widest hover:bg-[#135e96] shadow-xl transition-all flex items-center gap-2">
                        {actionLoading === 'saving_blog' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Publish / Update Post'}
                     </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

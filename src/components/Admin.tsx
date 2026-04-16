import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Users, Settings, Plus, Search, MoreVertical, TrendingUp, Package, DollarSign, Star, FileText, Check, X, Loader2, Mail, Trash2, Edit2, Shield, ShieldCheck, ShieldAlert, Menu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { uploadFile } from '../lib/storage';
import { Profile, BlogPost, Review, ContactMessage, Product, SiteSettings } from '../types';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profilesRes, blogRes, productsRes, reviewsRes, messagesRes, settingsRes, ordersRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('reviews').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
        supabase.from('site_settings').select('*').eq('id', 1).single(),
        supabase.from('orders').select('*').order('created_at', { ascending: false })
      ]);

      if (profilesRes.data) setProfiles(profilesRes.data);
      if (blogRes.data) setBlogPosts(blogRes.data);
      if (productsRes.data) setProducts(productsRes.data);
      if (reviewsRes.data) setReviews(reviewsRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
      if (settingsRes.data) setSiteSettings(settingsRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Users
  const handleApproveUser = async (userId: string, approved: boolean) => {
    setActionLoading(userId);
    const { error } = await supabase
      .from('profiles')
      .update({ is_approved: approved })
      .eq('id', userId);
    
    if (!error) {
      setProfiles(profiles.map(p => p.id === userId ? { ...p, is_approved: approved } : p));
    }
    setActionLoading(null);
  };

  const handlePromoteUser = async (userId: string, role: 'admin' | 'client') => {
    const action = role === 'admin' ? 'promote to Admin' : 'demote to Client';
    if (!confirm(`Are you sure you want to ${action} this user?`)) return;
    setActionLoading(userId);

    const updateData = role === 'admin' 
      ? { role, is_approved: true } 
      : { role, is_approved: false };

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);
    
    if (error) {
      alert(`Failed to update role: ${error.message}`);
      console.error('Role update error:', error);
    } else {
      setProfiles(profiles.map(p => 
        p.id === userId ? { ...p, ...updateData } : p
      ));
    }
    setActionLoading(null);
  };

  // Handlers for Blog
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    excerpt: '', 
    content: '', 
    image_url: '',
    meta_title: '',
    meta_description: ''
  });

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('create-post');
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      try {
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            ...newPost,
            author_id: user.id,
            author_name: 'Mel\'s Fashion Admin'
          });
        
        if (error) throw error;
        
        alert('Post published successfully!');
        setShowCreatePost(false);
        setNewPost({ 
          title: '', 
          excerpt: '', 
          content: '', 
          image_url: '',
          meta_title: '',
          meta_description: ''
        });
        fetchData();
      } catch (err: any) {
        alert('Failed to publish post: ' + (err.message || 'Unknown error'));
        console.error('Publish error:', err);
      }
    } else {
      alert('You must be logged in as an admin to publish posts.');
    }
    setActionLoading(null);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setActionLoading(postId);
    const { error } = await supabase.from('blog_posts').delete().eq('id', postId);
    if (!error) setBlogPosts(blogPosts.filter(p => p.id !== postId));
    setActionLoading(null);
  };

  // Handlers for Products
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', tagline: '', description: '', long_description: '', price: 0, category: 'Clutches' as any, image_url: '', gallery: [], features: []
  });

  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setProductForm(product);
    } else {
      setEditingProduct(null);
      setProductForm({ name: '', tagline: '', description: '', long_description: '', price: 0, category: 'Clutches' as any, image_url: '', gallery: [], features: [] });
      setImagePreview(null);
      setSelectedFile(null);
    }
    setShowProductModal(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading('save-product');
    
    try {
      let finalImageUrl = productForm.image_url;

      // Handle file upload if a new file is selected
      if (selectedFile) {
        setUploadLoading(true);
        finalImageUrl = await uploadFile(selectedFile, 'products');
        setUploadLoading(false);
      }

      if (!finalImageUrl) {
        alert('Please provide an image for the product');
        setActionLoading(null);
        return;
      }

      const submissionData = { ...productForm, image_url: finalImageUrl };

      if (editingProduct) {
        const { error } = await supabase.from('products').update(submissionData).eq('id', editingProduct.id);
        if (error) throw error;
        setShowProductModal(false);
        fetchData();
      } else {
        const { error } = await supabase.from('products').insert(submissionData);
        if (error) throw error;
        setShowProductModal(false);
        fetchData();
      }
    } catch (err: any) {
      alert(`Error saving product: ${err.message || 'Unknown error'}`);
    } finally {
      setActionLoading(null);
      setUploadLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setActionLoading(productId);
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (!error) setProducts(products.filter(p => p.id !== productId));
    setActionLoading(null);
  };

  // Handlers for Settings
  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings) return;
    setActionLoading('update-settings');
    const { error } = await supabase.from('site_settings').update(siteSettings).eq('id', 1);
    if (!error) {
      alert('Settings updated successfully');
    }
    setActionLoading(null);
  };

  // Handlers for Reviews
  const handleToggleReviewStatus = async (reviewId: string, currentStatus: string) => {
    setActionLoading(reviewId);
    const newStatus = currentStatus === 'published' ? 'pending' : 'published';
    const { error } = await supabase.from('reviews').update({ status: newStatus }).eq('id', reviewId);
    if (!error) {
      setReviews(reviews.map(r => r.id === reviewId ? { ...r, status: newStatus as any } : r));
    }
    setActionLoading(null);
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setActionLoading(reviewId);
    const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
    if (!error) setReviews(reviews.filter(r => r.id !== reviewId));
    setActionLoading(null);
  };

  // Handlers for Messages
  const handleMarkMessageRead = async (messageId: string) => {
    setActionLoading(messageId);
    const { error } = await supabase.from('contact_messages').update({ status: 'read' }).eq('id', messageId);
    if (!error) {
      setMessages(messages.map(m => m.id === messageId ? { ...m, status: 'read' } : m));
    }
    setActionLoading(null);
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    setActionLoading(messageId);
    const { error } = await supabase.from('contact_messages').delete().eq('id', messageId);
    if (!error) {
      setMessages(messages.filter(m => m.id !== messageId));
    }
    setActionLoading(null);
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setActionLoading(orderId);
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (error) {
      alert(`Error updating order: ${error.message}\nIf this is a constraint error, please ensure '${newStatus}' is added to the status check constraint in your Supabase database.`);
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
    setActionLoading(null);
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    setActionLoading(orderId);
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (error) {
      alert(`Error deleting order: ${error.message}`);
    } else {
      setOrders(orders.filter(o => o.id !== orderId));
    }
    setActionLoading(null);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user profile? This will not delete their auth account.')) return;
    setActionLoading(userId);
    const { error } = await supabase.from('profiles').delete().eq('id', userId);
    if (error) {
      alert(`Error deleting profile: ${error.message}`);
    } else {
      setProfiles(profiles.filter(p => p.id !== userId));
    }
    setActionLoading(null);
  };

  const stats = [
    { label: 'Total Sales', value: `KES ${orders.filter(o => o.status === 'paid' || o.status === 'completed').reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', tab: 'dashboard' },
    { label: 'Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50', tab: 'dashboard' },
    { label: 'Products', value: products.length.toString(), icon: Package, color: 'text-purple-600', bg: 'bg-purple-50', tab: 'products' },
    { label: 'Customers', value: profiles.length.toString(), icon: Users, color: 'text-orange-600', bg: 'bg-orange-50', tab: 'customers' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <Loader2 className="w-8 h-8 animate-spin text-stone-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-stone-50">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Premium Dark Sidebar */}
      <aside className={`
        w-64 bg-stone-950 min-h-screen flex flex-col fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:flex
      `}>
        <div className="px-8 py-10 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.4em] mb-2">Mel's Fashion</p>
            <p className="text-xl font-serif italic text-white lowercase">Maison d'Admin</p>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-stone-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 py-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'products', label: 'Inventory', icon: Package },
            { id: 'blog', label: 'Journal', icon: FileText },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'messages', label: 'Messages', icon: Mail },
            { id: 'customers', label: 'Members', icon: Users },
            { id: 'settings', label: 'Workshop', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-8 py-4 text-xs font-bold transition-all uppercase tracking-widest ${
                activeTab === item.id 
                  ? 'bg-white text-stone-950' 
                  : 'text-stone-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-8 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-stone-400" />
            </div>
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Verified Admin</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 lg:p-16">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between mb-4 pb-4 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-stone-600 hover:text-stone-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <p className="text-sm font-serif italic text-stone-900">Maison d'Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-stone-400" />
          </div>
        </div>

        {/* New: Mobile Horizontal One-Click Navigation */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-6 no-scrollbar -mx-2 px-2 scroll-smooth">
          {[
            { id: 'dashboard', label: 'Dash', icon: LayoutDashboard },
            { id: 'products', label: 'Inv', icon: Package },
            { id: 'blog', label: 'Journal', icon: FileText },
            { id: 'reviews', label: 'Stars', icon: Star },
            { id: 'messages', label: 'Inbox', icon: Mail },
            { id: 'customers', label: 'Users', icon: Users },
            { id: 'settings', label: 'Tools', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 flex flex-col items-center justify-center gap-1.5 px-6 py-4 rounded-2xl transition-all border ${
                activeTab === item.id 
                  ? 'bg-stone-950 text-white border-stone-950 shadow-lg' 
                  : 'bg-white text-stone-500 border-stone-100 hover:border-stone-200'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-stone-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </div>
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em] mb-2 block">Management</span>
            <h1 className="text-4xl lg:text-5xl font-serif text-stone-900 capitalize italic lowercase">
              {activeTab === 'dashboard' ? 'Overview' : activeTab}
            </h1>
          </div>
          
          <div className="flex gap-4">
            {activeTab === 'products' && !showProductModal && (
              <button onClick={() => handleOpenProductModal()} className="px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl">
                + Nouveau Produit
              </button>
            )}
            {activeTab === 'blog' && !showCreatePost && (
              <button onClick={() => setShowCreatePost(true)} className="px-8 py-3 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all shadow-xl">
                + Nouvelle Histoire
              </button>
            )}
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-12">
            {/* Elegant Stat Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat) => (
                <button 
                  key={stat.label} 
                  onClick={() => setActiveTab(stat.tab)}
                  className="group bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl border border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all text-left"
                >
                  <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.bg} ${stat.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform group-hover:scale-110`}>
                    <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <p className="text-[9px] md:text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em] mb-1 md:mb-2">{stat.label}</p>
                  <p className="text-xl md:text-3xl font-serif text-stone-900 tracking-tight">{stat.value}</p>
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-serif font-bold">Recent Orders</h3>
                <button className="text-stone-500 text-sm hover:text-stone-800">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-stone-50 text-stone-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Product</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-stone-500">No orders yet.</td>
                      </tr>
                    ) : orders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50 transition-colors">
                        <td className="px-6 py-4 font-medium break-words max-w-[120px]">{order.id.slice(0, 8)}...</td>
                        <td className="px-6 py-4">{order.phone_number}</td>
                        <td className="px-6 py-4 max-w-[200px] truncate">{order.items?.map((i: any) => i.name).join(', ')}</td>
                        <td className="px-6 py-4">KES {Number(order.amount).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.status === 'paid' ? 'bg-green-100 text-green-700' :
                            order.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {order.status !== 'completed' && (
                              <button 
                                onClick={() => handleUpdateOrderStatus(order.id, 'completed')} 
                                disabled={actionLoading === order.id}
                                className="text-xs px-2 py-1 bg-stone-100 font-bold hover:bg-stone-200 text-stone-600 rounded whitespace-nowrap disabled:opacity-50"
                              >
                                {actionLoading === order.id ? <Loader2 className="w-3 h-3 animate-spin inline mr-1" /> : <Check className="w-3 h-3 inline mr-1" />}
                                Mark Complete
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteOrder(order.id)}
                              disabled={actionLoading === order.id}
                              className="text-red-400 hover:text-red-600 disabled:opacity-50"
                              title="Delete Order"
                            >
                              {actionLoading === order.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                            </button>
                            <button className="text-stone-400 hover:text-stone-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-6">
            {showProductModal ? (
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                  <button onClick={() => setShowProductModal(false)} className="text-stone-400 hover:text-stone-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleSaveProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Product Name</label>
                      <input 
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                        placeholder="e.g. Nairobi NightClutch"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Price (KES)</label>
                      <input 
                        required
                        type="number"
                        value={productForm.price}
                        onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest">Category</label>
                      <select 
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                      >
                        <option value="Totes">Totes</option>
                        <option value="Shoulder bags">Shoulder bags</option>
                        <option value="Heels">Heels</option>
                        <option value="Charms">Charms</option>
                        <option value="Clutches">Clutches</option>
                        <option value="Satchels">Satchels</option>
                        <option value="Crossbody">Crossbody</option>
                        <option value="Bucket">Bucket</option>
                        <option value="Weekender">Weekender</option>
                      </select>
                    </div>
                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-widest block">Product Image</label>
                    <div className="flex flex-col gap-4">
                      {imagePreview || productForm.image_url ? (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                          <img 
                            src={imagePreview || productForm.image_url} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                          <button 
                            type="button"
                            onClick={() => { setSelectedFile(null); setImagePreview(null); setProductForm({ ...productForm, image_url: '' }); }}
                            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm text-red-600 rounded-full hover:bg-white transition-all shadow-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full aspect-video rounded-xl border-2 border-dashed border-stone-200 flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
                          <Plus className="w-8 h-8 text-stone-300 mb-2" />
                          <p className="text-sm text-stone-500 font-medium italic">Click to upload elegant, high-quality product photo</p>
                          <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider font-bold">Recommended: JPG, PNG • Max 5MB</p>
                        </div>
                      )}
                      
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full py-3 px-4 bg-stone-100 text-stone-700 rounded-lg text-sm font-bold uppercase tracking-widest text-center group-hover:bg-stone-200 transition-all font-serif">
                          {uploadLoading ? 'Uploading...' : (selectedFile || productForm.image_url ? 'Change Image' : 'Select Image from Device')}
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold text-center">
                        Images are automatically optimized for performance & sharp quality
                      </p>
                    </div>
                  </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Tagline</label>
                    <input 
                      required
                      value={productForm.tagline}
                      onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                      placeholder="e.g. Elegance in the city."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Description</label>
                    <textarea 
                      required
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none h-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest">Long Description</label>
                    <textarea 
                      value={productForm.long_description}
                      onChange={(e) => setProductForm({ ...productForm, long_description: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none h-32"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button type="button" onClick={() => setShowProductModal(false)} className="px-6 py-3 text-sm font-bold uppercase tracking-widest text-stone-500">Cancel</button>
                    <button type="submit" disabled={actionLoading === 'save-product'} className="px-8 py-3 bg-stone-900 text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2">
                      {actionLoading === 'save-product' ? <Loader2 className="w-4 h-4 animate-spin" /> : (editingProduct ? 'Update Product' : 'Add Product')}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-serif font-bold">Product Inventory</h3>
                  <button onClick={() => handleOpenProductModal()} className="text-stone-900 text-sm font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-stone-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Product</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <img src={product.image_url} className="w-10 h-10 object-cover rounded" />
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">{product.category}</td>
                          <td className="px-6 py-4">KES {product.price.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button onClick={() => handleOpenProductModal(product)} className="text-stone-400 hover:text-stone-600"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDeleteProduct(product.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="space-y-4">
            {showCreatePost ? (
              <div className="bg-white border border-stone-200 shadow-sm">
                {/* WP-style post header */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-stone-200 bg-stone-50">
                  <h3 className="text-sm font-bold text-stone-700">Add New Post</h3>
                  <button onClick={() => setShowCreatePost(false)} className="text-stone-400 hover:text-stone-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleCreatePost} className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main content */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wider">Post Title *</label>
                      <input 
                        required
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-500 focus:border-stone-500 outline-none"
                        placeholder="Enter post title here"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wider">Excerpt *</label>
                      <textarea 
                        required
                        rows={2}
                        value={newPost.excerpt}
                        onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-500 outline-none resize-none"
                        placeholder="Short summary shown in the blog listing..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-stone-600 mb-1 uppercase tracking-wider">Content *</label>
                      <textarea 
                        required
                        rows={12}
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-500 outline-none resize-y"
                        placeholder="Write your full story here..."
                      />
                    </div>

                    {/* SEO Section */}
                    <div className="border border-stone-200 rounded">
                      <div className="flex items-center gap-2 px-4 py-2 bg-stone-50 border-b border-stone-200">
                        <Search className="w-4 h-4 text-stone-500" />
                        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">SEO Settings</span>
                      </div>
                      <div className="p-4 space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-600 mb-1">SEO Title
                            <span className="ml-2 text-xs font-normal text-stone-400 normal-case">(Leave blank to use Post Title)</span>
                          </label>
                          <input 
                            value={newPost.meta_title}
                            onChange={(e) => setNewPost({ ...newPost, meta_title: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Premium Leather Clutch Bags Nairobi | Mel's Fashion"
                            maxLength={60}
                          />
                          <p className="text-[10px] text-stone-400 mt-1">Recommended: 50–60 characters. Current: {newPost.meta_title.length}</p>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-stone-600 mb-1">Meta Description
                            <span className="ml-2 text-xs font-normal text-stone-400 normal-case">(Shown in Google search results)</span>
                          </label>
                          <textarea 
                            rows={3}
                            value={newPost.meta_description}
                            onChange={(e) => setNewPost({ ...newPost, meta_description: e.target.value })}
                            className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            placeholder="e.g. Discover handcrafted premium leather handbags in Nairobi, Kenya. Mel's Fashion offers luxury clutches, totes, and crossbody bags for the modern Kenyan woman."
                            maxLength={160}
                          />
                          <p className="text-[10px] text-stone-400 mt-1">Recommended: 150–160 characters. Current: {newPost.meta_description.length}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar panel */}
                  <div className="space-y-4">
                    <div className="border border-stone-200 rounded">
                      <div className="px-4 py-2 bg-stone-50 border-b border-stone-200">
                        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Publish</span>
                      </div>
                      <div className="p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span>Status:</span>
                          <span className="font-bold text-green-600">Published</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-stone-500">
                          <span>Author:</span>
                          <span className="font-bold">Mel's Fashion Admin</span>
                        </div>
                        <div className="pt-2 flex gap-2">
                          <button type="button" onClick={() => setShowCreatePost(false)} className="flex-1 px-3 py-2 text-xs font-bold border border-stone-300 text-stone-600 rounded hover:bg-stone-50 transition-colors">
                            Cancel
                          </button>
                          <button type="submit" disabled={actionLoading === 'create-post'} className="flex-1 px-3 py-2 text-xs font-bold bg-[#1d2327] text-white rounded hover:bg-[#2c3338] transition-colors disabled:opacity-50 flex items-center justify-center gap-1">
                            {actionLoading === 'create-post' ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Publish Post'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border border-stone-200 rounded">
                      <div className="px-4 py-2 bg-stone-50 border-b border-stone-200">
                        <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Featured Image</span>
                      </div>
                      <div className="p-4">
                        <input 
                          value={newPost.image_url}
                          onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}
                          className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded focus:ring-1 focus:ring-stone-500 outline-none"
                          placeholder="https://... image URL"
                        />
                        {newPost.image_url && (
                          <img src={newPost.image_url} alt="preview" className="mt-2 w-full aspect-video object-cover rounded" />
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-stone-100 flex items-center justify-between">
                  <h3 className="font-serif font-bold">Blog Management</h3>
                  <button onClick={() => setShowCreatePost(true)} className="text-stone-900 text-sm font-bold flex items-center gap-2 hover:opacity-70 transition-opacity">
                    <Plus className="w-4 h-4" /> Create Post
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-stone-50 text-stone-500 font-medium">
                      <tr>
                        <th className="px-6 py-4">Title</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {blogPosts.map((post) => (
                        <tr key={post.id} className="hover:bg-stone-50 transition-colors">
                          <td className="px-6 py-4 font-medium">{post.title}</td>
                          <td className="px-6 py-4">{new Date(post.created_at).toLocaleDateString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <button onClick={() => handleDeletePost(post.id)} disabled={actionLoading === post.id} className="text-red-400 hover:text-red-600 disabled:opacity-50">
                                {actionLoading === post.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-serif font-bold">Customer Reviews</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Comment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {reviews.map((review) => (
                    <tr key={review.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{review.customer_name}</td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-stone-800 text-stone-800' : 'text-stone-200'}`} />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-500 max-w-xs truncate">{review.comment}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          review.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {review.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleToggleReviewStatus(review.id, review.status)} className="p-2 bg-stone-50 rounded-lg hover:bg-stone-100">
                            {review.status === 'published' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                          </button>
                          <button onClick={() => handleDeleteReview(review.id)} className="p-2 text-red-400 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-serif font-bold">Contact Messages</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">From</th>
                    <th className="px-6 py-4">Subject</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {messages.map((msg) => (
                    <tr key={msg.id} className={`hover:bg-stone-50 transition-colors ${msg.status === 'unread' ? 'bg-stone-50/50 font-medium' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span>{msg.name}</span>
                          <span className="text-xs text-stone-400">{msg.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">{msg.subject}</td>
                      <td className="px-6 py-4">{new Date(msg.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          msg.status === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-stone-100 text-stone-500'
                        }`}>
                          {msg.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => handleMarkMessageRead(msg.id)} disabled={msg.status === 'read'} className="text-stone-400 hover:text-stone-600 disabled:opacity-30">
                            <Check className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 hover:text-red-600">
                             <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-stone-100">
              <h3 className="font-serif font-bold">User Approvals</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 font-medium">
                  <tr>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 font-medium">{p.email}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Role Badge */}
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.role === 'admin' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'bg-stone-100 text-stone-500'
                      }`}>
                        {p.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {/* Promote to Admin */}
                      {p.role === 'client' && (
                        <button 
                          onClick={() => handlePromoteUser(p.id, 'admin')}
                          disabled={actionLoading === p.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors disabled:opacity-50 text-xs font-bold uppercase tracking-wider"
                          title="Promote to Admin"
                        >
                          {actionLoading === p.id 
                            ? <Loader2 className="w-3 h-3 animate-spin" /> 
                            : <Shield className="w-3 h-3" />
                          }
                          Make Admin
                        </button>
                      )}

                      {/* Demote to Client */}
                      {p.role === 'admin' && (
                        <button 
                          onClick={() => handlePromoteUser(p.id, 'client')}
                          disabled={actionLoading === p.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors disabled:opacity-50 text-xs font-bold uppercase tracking-wider"
                          title="Demote to Client"
                        >
                          {actionLoading === p.id 
                            ? <Loader2 className="w-3 h-3 animate-spin" /> 
                            : <ShieldAlert className="w-3 h-3" />
                          }
                          Demote
                        </button>
                      )}

                      <button 
                        onClick={() => handleDeleteUser(p.id)}
                        disabled={actionLoading === p.id}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50 text-xs font-bold uppercase tracking-wider"
                        title="Delete User"
                      >
                        {actionLoading === p.id 
                          ? <Loader2 className="w-3 h-3 animate-spin" /> 
                          : <Trash2 className="w-3 h-3" />
                        }
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}

        {activeTab === 'settings' && siteSettings && (
          <div className="bg-white rounded-xl border border-stone-200 shadow-sm p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-stone-100 rounded-lg">
                <Settings className="w-6 h-6 text-stone-600" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold">Store Settings</h3>
                <p className="text-stone-500 text-sm">Manage dynamic contact info and socials</p>
              </div>
            </div>
            
            <form onSubmit={handleUpdateSettings} className="space-y-8 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Contact Phone</label>
                  <input 
                    value={siteSettings.phone}
                    onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Contact Email</label>
                  <input 
                    value={siteSettings.email}
                    onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest">Workshop Address</label>
                <input 
                  value={siteSettings.address}
                  onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Instagram URL</label>
                  <input 
                    value={siteSettings.instagram_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, instagram_url: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">Facebook URL</label>
                  <input 
                    value={siteSettings.facebook_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, facebook_url: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">TikTok URL</label>
                  <input 
                    value={siteSettings.tiktok_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, tiktok_url: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest">WhatsApp Number</label>
                  <input 
                    value={siteSettings.whatsapp_number || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp_number: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                    placeholder="e.g. 254700000000"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest">WhatsApp Group URL</label>
                  <input 
                    value={siteSettings.whatsapp_group_url || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp_group_url: e.target.value })}
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-900 outline-none"
                    placeholder="https://chat.whatsapp.com/..."
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button type="submit" disabled={actionLoading === 'update-settings'} className="px-8 py-4 bg-stone-900 text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2">
                  {actionLoading === 'update-settings' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}

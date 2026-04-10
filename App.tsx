/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, useParams } from 'react-router-dom';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Reviews from './components/Reviews';
import Auth from './components/Auth';
import Blog from './components/Blog';
import BlogPostDetail from './components/BlogPost';
import SEO from './components/SEO';
import StructuredData from './components/StructuredData';
import SiteOverview from './components/SiteOverview';
import { Analytics } from '@vercel/analytics/react';
import { Product, Profile, BlogPost as BlogPostType, SiteSettings } from './types';
import { PRODUCTS, JOURNAL_ARTICLES } from './constants';

function AppContent() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      fetchSettings();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (data) setProfile(data);
  };

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase.from('site_settings').select('*').eq('id', 1).single();
      if (!error && data) {
        setSiteSettings(data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB]">
        <div className="w-8 h-8 border-4 border-[#2C2A26] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isAdmin = profile?.role === 'admin';
  const isApproved = profile?.is_approved;

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      <SEO />
      <Analytics />
      {siteSettings && <StructuredData type="LocalBusiness" data={siteSettings} />}
      
      {location.pathname !== '/checkout' && (
        <Navbar 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
            user={user}
            isAdmin={isAdmin}
        />
      )}
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <StructuredData type="CollectionPage" data={{}} />
              <Hero />
              <div id="products">
                <ProductGrid onProductClick={(p) => navigate(`/product/${p.id}`)} />
              </div>
              <SiteOverview />
              <About />
              <Journal onArticleClick={(a) => navigate(`/journal/${a.id}`)} />
            </>
          } />

          <Route path="/product/:id" element={<ProductDetailWrapper onAddToCart={addToCart} />} />
          <Route path="/journal/:id" element={<JournalDetailWrapper />} />
          <Route path="/checkout" element={<Checkout items={cartItems} onBack={() => navigate('/')} />} />
          <Route path="/contact" element={<Contact settings={siteSettings} />} />
          <Route path="/reviews" element={<Reviews fullPage />} />
          <Route path="/blog" element={<Blog onArticleClick={(post) => navigate(`/blog/${post.id}`)} />} />
          <Route path="/blog/:id" element={<BlogPostWrapper />} />
          
          <Route path="/auth" element={user ? <Navigate to="/" /> : <Auth onSuccess={() => navigate('/')} />} />
          
          <Route path="/admin" element={
            isAdmin ? <Admin /> : <Navigate to="/auth" />
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

      {location.pathname !== '/checkout' && (
        <Footer settings={siteSettings} onLinkClick={(e, id) => {
          if (id === 'contact') navigate('/contact');
          else if (id === 'admin') navigate('/admin');
          else if (id === 'reviews') navigate('/reviews');
          else if (id === 'journal') navigate('/blog');
          else {
            navigate('/');
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }} />
      )}
      
      <Assistant />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            navigate('/checkout');
        }}
      />

      {!isApproved && user && (
        <div className="fixed bottom-0 left-0 right-0 bg-amber-50 border-t border-amber-200 p-4 text-center z-[100]">
          <p className="text-amber-800 text-sm font-medium">
            Your account is pending approval from an administrator. Some features may be restricted.
          </p>
        </div>
      )}
    </div>
  );
}

// Wrappers for detail views to handle params
function ProductDetailWrapper({ onAddToCart }: { onAddToCart: (p: Product) => void }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      // Try DB first
      const { data } = await supabase.from('products').select('*').eq('id', id).single();
      if (data) {
        setProduct(data);
      } else {
        // Fallback to constants
        const fallback = PRODUCTS.find(p => p.id === id);
        if (fallback) setProduct(fallback);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!product) return <Navigate to="/" />;
  return (
    <>
      <SEO 
        title={`${product.name} | Premium Handbags Kenya`}
        description={product.description}
        image={product.image_url}
        url={`https://melsfashion.com/product/${product.id}`}
        type="product"
      />
      <StructuredData type="Product" data={product} />
      <ProductDetail product={product} onBack={() => navigate('/')} onAddToCart={onAddToCart} />
    </>
  );
}

function JournalDetailWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = JOURNAL_ARTICLES.find(a => a.id === Number(id));
  if (!article) return <Navigate to="/" />;
  return <JournalDetail article={article} onBack={() => navigate('/')} />;
}

function BlogPostWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      const { data } = await supabase.from('blog_posts').select('*').eq('id', id).single();
      if (data) setPost(data);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!post) return <Navigate to="/blog" />;
  return <BlogPostDetail post={post} onBack={() => navigate('/blog')} />;
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

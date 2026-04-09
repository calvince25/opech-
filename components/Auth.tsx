import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      } else {
        // Signup logic
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
        });
        
        if (signUpError) throw signUpError;

        if (signUpData.user) {
          // Check if this is the first user
          // We use public SELECT policy added to schema to check count
          const { count, error: countError } = await supabase
            .from('profiles')
            .select('*', { count: 'exact', head: true });

          if (countError) {
             console.error('Count error:', countError);
          }

          const isFirstUser = count === 0;
          
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: signUpData.user.id,
              email: email,
              role: isFirstUser ? 'admin' : 'client',
              is_approved: isFirstUser ? true : false,
            });

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw new Error(`Profile creation failed: ${profileError.message}`);
          }
        }
      }
      onSuccess();
    } catch (err: any) {
      console.error('Auth handler error:', err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full p-10 rounded-sm relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Welcome Back.' : 'Create Account.'}
          </h2>
          <p className="text-white/70 text-sm">
            {isLogin ? 'Sign in to access your Mell Bags dashboard' : 'Join our community of elegance'}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-sm text-white focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all outline-none"
                placeholder="you@email.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-black/20 border border-white/10 rounded-sm text-white focus:ring-1 focus:ring-white/50 focus:border-white/50 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-200 text-xs bg-red-900/50 p-3 mb-4 rounded-sm border border-red-500/30">
              {error}
            </p>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-white text-black rounded-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {isLogin ? 'Log In' : 'Register'}
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            {isLogin ? "Lost your password? | Register" : "Already have an account? Log In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

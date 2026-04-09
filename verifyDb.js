import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkOrders() {
  const { data, error } = await supabase.from('orders').select('*').limit(1);
  if (error) {
    if (error.code === '42P01') {
      console.log('TABLE_MISSING');
    } else {
      console.log('ERROR:', error.message);
    }
  } else {
    console.log('TABLE_EXISTS');
  }
}

checkOrders();

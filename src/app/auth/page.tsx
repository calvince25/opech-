"use client";

import React from 'react';
import Auth from '@/components/Auth';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();

  return <Auth onSuccess={() => router.push('/')} />;
}

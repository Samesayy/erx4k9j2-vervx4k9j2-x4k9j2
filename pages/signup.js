// pages/signup.js

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded shadow p-8">
          <h1 className="text-2xl font-bold text-primary-dark mb-4">Sign Up</h1>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-primary-dark">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-medium-gray rounded bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <div>
              <label className="block text-primary-dark">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-medium-gray rounded bg-primary-light text-primary-dark focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-brand-primary text-primary-light px-4 py-2 rounded hover:bg-accent transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-medium-gray">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-primary hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

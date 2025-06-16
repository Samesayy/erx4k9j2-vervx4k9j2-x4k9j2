// components/AuthGuard.jsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

// This component will protect pages that require a user to be logged in.
// It can also check for a specific role (like 'host').
export default function AuthGuard({ children, allowedRoles }) {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    // If the user data is still loading, don't do anything yet.
    if (!user && supabase.auth.isLoading) {
      return;
    }
    
    // If there is no user, redirect to login page.
    if (!user) {
      router.push('/login');
      return;
    }

    // If roles are specified, check them.
    if (allowedRoles && allowedRoles.length > 0) {
      const checkUserRole = async () => {
        // Fetch the user's profile from our 'profiles' table.
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_host')
          .eq('id', user.id)
          .single();
        
        // Check if the user is a host
        const isHost = profile?.is_host || false;

        // If the route requires a 'host' and the user is not a host, redirect.
        if (allowedRoles.includes('host') && !isHost) {
          router.push('/dashboard/guest'); // Redirect non-hosts to their guest dashboard
        }
      };

      checkUserRole();
    }

  }, [user, supabase.auth.isLoading, router, allowedRoles, supabase]);

  // If user is logged in (and has the right role if specified), show the page.
  // Otherwise, show a loading indicator while checks are performed.
  return user ? <>{children}</> : <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}
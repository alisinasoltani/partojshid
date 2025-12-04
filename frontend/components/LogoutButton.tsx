'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

export default function LogoutButton() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    Cookies.remove('jeyshid', { path: '/' });
    queryClient.clear();
    router.push('/login');
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
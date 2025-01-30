import { deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { Menu } from '../components/menu/Menu';

export default function ProfilePage() {
  return (
    <>
      <h1>Добро пожаловать!</h1>
      <Menu />
    </>
  );
}
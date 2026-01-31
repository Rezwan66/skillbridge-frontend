import { userService } from '@/services/user.service';
import { cookies } from 'next/headers';

export default async function HomePage() {
  const { data, error } = await userService.getSession();
  console.log(data);

  return (
    <div>
      <h2>HomePage page</h2>
    </div>
  );
}

import { userService } from '@/services/user.service';

export default async function EditProfilePage() {
  const { data } = await userService.getSession();
  console.log(data);
  const user = data?.user;
  return (
    <div>
      <h2>EditProfilePage page</h2>
    </div>
  );
}

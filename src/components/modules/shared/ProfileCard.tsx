'use client';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { authClient } from '@/lib/auth-client';
import { UserInfo } from '@/types/user.type';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfileCard({ user }: { user: UserInfo }) {
  const { name, email, image, role } = user;
  // const role = 'STUDENT';

  const initials =
    name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Logged out successfully');
          // redirect to login page
          // router.push('/login'); // bad for logout
          window.location.href = '/login'; //full reload, clear states
        },
      },
    });
  };
  const avatarUrl =
    image ||
    `https://api.dicebear.com/9.x/notionists/svg?seed=${user?.id}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    // <Card className="mx-auto w-full max-w-62.5 bg-transparent">
    //   <CardHeader className="flex flex-row items-center gap-6 ">
    //     <Avatar>
    //       <AvatarImage
    //         src={`${image ?? 'https://github.com/shadcn.png'}`}
    //         alt="@shadcn"
    //       />
    //       <AvatarFallback>CN</AvatarFallback>
    //       <AvatarBadge className="bg-green-600 dark:bg-green-800" />
    //     </Avatar>
    //     <CardTitle>{name}</CardTitle>
    //   </CardHeader>

    //   <CardFooter className="pt-0">
    //     <Button
    //       onClick={handleLogout}
    //       variant="destructive"
    //       size="sm"
    //       className="w-full gap-2"
    //     >
    //       <LogOut className="h-4 w-4" />
    //     </Button>
    //   </CardFooter>
    // </Card>
    <Card className="w-full border-0 shadow-none bg-transparent mt-4">
      <CardHeader className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-14 w-14 border-2 border-primary/10 bg-muted">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback className="bg-primary/10 text-lg font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="font-semibold text-lg leading-none">{name}</h3>
            <p className="text-sm text-muted-foreground">{email}</p>
            {role && (
              <Badge
                variant="secondary"
                className={`text-xs text-black uppercase ${role === 'STUDENT' ? 'bg-green-400' : role === 'TUTOR' ? 'bg-blue-400' : 'bg-amber-400'}`}
              >
                {role.toLowerCase()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardFooter className="pt-0">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="sm"
          className="w-full gap-2 bg-rose-400 text-white"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}

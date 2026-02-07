import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { UserPen } from 'lucide-react';
import { Roles } from '@/constants';

export default function DashboardProfile({ user }: { user: any }) {
  const initials =
    user.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  return (
    // <div className="flex items-center gap-4 rounded-lg border p-4">
    //   <Avatar className="h-14 w-14">
    //     <AvatarImage src={user.image ?? undefined} />
    //     <AvatarFallback>{user.name?.[0]?.toUpperCase()}</AvatarFallback>
    //   </Avatar>

    //   <div className="space-y-4">
    //     <p className="text-lg font-medium">{user.name}</p>
    //     <p className="text-sm text-muted-foreground">{user.email}</p>

    //     <div className="flex gap-2">
    //       <Badge className={``}>{user.role}</Badge>
    //       <Badge variant="secondary">{user.status}</Badge>
    //     </div>
    //   </div>
    // </div>
    <Card className="flex gap-6 rounded-lg border p-6">
      <div className="flex items-center gap-4">
        {/* image */}
        <div className="relative">
          <Avatar className="h-14 w-14 border-2 border-primary/10">
            <AvatarImage src={user.image ?? ''} alt={'user profile image'} />
            <AvatarFallback className="bg-primary/10 text-lg font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
        </div>
        {/* name email */}
        <div className="flex-1 space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-none">{user.name}</h3>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          {/* badges */}
          <div className="flex items-center gap-2">
            {user.role && (
              <Badge
                variant="secondary"
                className={`text-xs text-black uppercase ${user.role === 'STUDENT' ? 'bg-green-400' : user.role === 'TUTOR' ? 'bg-blue-400' : 'bg-amber-400'}`}
              >
                {user.role.toLowerCase()}
              </Badge>
            )}

            <Badge variant="outline" className="text-xs  uppercase">
              {user.status}
            </Badge>
          </div>
        </div>
        {/* edit */}
        {user.role === Roles.admin ? null : (
          <div className="flex flex-col items-center">
            <UserPen className="text-xs" />
            <Link
              className="underline text-xs text-center"
              href={`/dashboard/${
                user.role === Roles.student
                  ? 'edit-profile'
                  : user.role === Roles.tutor
                    ? 'profile'
                    : ''
              }`}
            >
              {user.role === Roles.tutor ? 'Tutor Profile' : 'Edit Profile'}
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}

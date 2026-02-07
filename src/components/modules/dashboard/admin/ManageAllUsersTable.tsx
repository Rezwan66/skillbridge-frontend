'use client';

import { updateUserStatusAction } from '@/actions/admin.action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserStatuses } from '@/constants';
import { UserStatus } from '@/types/constants.type';

import { UserInfo } from '@/types/user.type';
import { ShieldCheck, ShieldCheckIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ManageAllUsersTable({
  allUsers,
}: {
  allUsers: UserInfo[];
}) {
  if (!allUsers.length) {
    return (
      <p className="text-muted-foreground">
        There are no users in this platform yet!
      </p>
    );
  }

  const handleUnban = async (id: string, payload: { status: UserStatus }) => {
    const toastSlug = toast.loading('Unbanning user...');
    // console.log({ id, payload });
    try {
      const res = await updateUserStatusAction(id, payload);
      if (res.error) {
        return toast.error(res.error.message, { id: toastSlug });
      }
      toast.success('User unbanned ✅', { id: toastSlug });
    } catch (error) {
      toast.error('Something Went Wrong', { id: toastSlug });
    }
  };

  const handleBan = async (id: string, payload: { status: UserStatus }) => {
    const toastSlug = toast.loading('Banning user...');
    // console.log({ id, payload });
    try {
      const res = await updateUserStatusAction(id, payload);
      if (res.error) {
        return toast.error(res.error.message, { id: toastSlug });
      }
      toast.success('User banned ❌', { id: toastSlug });
    } catch (error) {
      toast.error('Something Went Wrong', { id: toastSlug });
    }
  };

  return (
    <div className="rounded-md border">
      <Table className="text-left">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Email Verified?</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Role</TableHead>

            <TableHead>Status</TableHead>
            <TableHead>Ban/Unban</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allUsers.map(user => {
            // const tutor = user.tutorProfile;
            // const availability = user.availability;

            return (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user?.name ?? 'User'}
                </TableCell>

                <TableCell className="flex flex-row gap-1 items-center text-muted-foreground">
                  {user?.email}
                </TableCell>

                <TableCell>{user?.emailVerified ? 'Yes' : 'No'}</TableCell>

                <TableCell>
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleString([], {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </TableCell>

                <TableCell>{user?.role}</TableCell>
                {/* status */}
                <TableCell className="flex flex-row gap-2">
                  <p className="flex-1"> {user?.status}</p>
                </TableCell>
                <TableCell>
                  <div className="flex-1 flex flex-row gap-1">
                    {/* BANNED */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon-xs"
                          variant="outline"
                          disabled={user?.status === UserStatuses.banned}
                          onClick={() =>
                            handleBan(user?.id, { status: UserStatuses.banned })
                          }
                          className="text-xs text-red-500 "
                        >
                          ❌
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Ban User</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* ACTIVE */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon-xs"
                          variant="outline"
                          disabled={user?.status === UserStatuses.active}
                          onClick={() =>
                            handleUnban(user?.id, {
                              status: UserStatuses.active,
                            })
                          }
                          className="text-xs text-green-400"
                        >
                          ✅
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Unban User</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { updateUserStatusAction } from '@/actions/admin.action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { UserInfo } from '@/types/user.type';
import { toast } from 'sonner';

export default function ManageAllUsersTable({
  allUsers,
}: {
  allUsers: UserInfo[];
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (!allUsers.length) {
    return (
      <p className="text-muted-foreground">
        There are no users in this platform yet!
      </p>
    );
  }

  const handleUnban = async (id: string, payload: { status: UserStatus }) => {
    const toastSlug = toast.loading('Unbanning user...');
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

  const filteredUsers = allUsers.filter(user => 
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
    (user.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Filter users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>
      </div>

      <div className="rounded-md border bg-card">
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
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user?.name ?? 'User'}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
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
                  <TableCell className="capitalize">{user?.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${user?.status === UserStatuses.banned ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'}`}>
                      {user?.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row gap-1">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon-xs"
                            variant="secondary"
                            className="h-8 w-8"
                            disabled={user?.status === UserStatuses.banned}
                            onClick={() =>
                              handleBan(user?.id, { status: UserStatuses.banned })
                            }
                          >
                            ❌
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Ban User</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            disabled={user?.status === UserStatuses.active}
                            onClick={() =>
                              handleUnban(user?.id, {
                                status: UserStatuses.active,
                              })
                            }
                          >
                            ✅
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Unban User</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}

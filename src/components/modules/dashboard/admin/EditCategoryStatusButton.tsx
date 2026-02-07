'use client';
import { updateCategoryStatusAction } from '@/actions/admin.action';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Category } from '@/types/category.type';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function EditCategoryStatusButton({ cat }: { cat: Category }) {
  const [open, setOpen] = useState(false);
  //   const router = useRouter();
  const handleUpdateCategoryStatus = async (payload: {
    id: string;
    isActive: boolean;
  }) => {
    const toastSlug = toast.loading(
      `Making category ${payload.isActive ? 'active' : 'deactivated'}...`,
    );
    try {
      const res = await updateCategoryStatusAction(payload);

      if (res.error) {
        return toast.error(res.error.message, { id: toastSlug });
      }
      toast.success(
        `Made category ${payload.isActive ? 'active ✅' : 'deactivated ❌'}`,
        { id: toastSlug },
      );
      //   router.refresh()
      setOpen(false); // close dialog on success
    } catch (error) {
      toast.error('Something Went Wrong', { id: toastSlug });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Badge variant="outline" className="py-2 px-6 cursor-pointer">
          <p> {cat?.name}</p>
          {/* make active */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon-xs" variant="outline" className="text-xs">
                {cat.isActive ? '✅' : '❌'}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{cat.isActive ? 'Active' : 'Not Active'}</p>
            </TooltipContent>
          </Tooltip>
        </Badge>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit category</DialogTitle>
          <DialogDescription className="text-left" asChild>
            <div className="space-y-1 py-2">
              <p className="text-sm font-medium">Current Status:</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <span className="font-bold">Category Name : </span>
                  {cat.name}
                </p>
                <p>
                  <span className="font-bold">Active Status : </span>
                  {cat.isActive ? 'Active ✅' : 'Inactive ❌'}
                </p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-row items-center ">
          <Button
            size="sm"
            disabled={cat.isActive}
            variant="default"
            className="bg-green-400 flex-1"
            onClick={() =>
              handleUpdateCategoryStatus({ id: cat.id, isActive: true })
            }
          >
            Activate
          </Button>
          <Button
            size="sm"
            disabled={!cat.isActive}
            variant="destructive"
            className="flex-1"
            onClick={() =>
              handleUpdateCategoryStatus({ id: cat.id, isActive: false })
            }
          >
            Deactivate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import {
  updateTutorFeaturedStatusAction,
  updateUserStatusAction,
} from '@/actions/admin.action';
import { Badge } from '@/components/ui/badge';
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
import { TutorProfile } from '@/types/tutor.type';

import { toast } from 'sonner';

export default function ManageTutorsTable({
  tutors,
}: {
  tutors: TutorProfile[];
}) {
  if (!tutors.length) {
    return (
      <p className="text-muted-foreground">
        There are no tutor profiles in this platform yet!
      </p>
    );
  }

  const makeFeatured = async (id: string, payload: { isFeatured: boolean }) => {
    const toastSlug = toast.loading('Making tutor featured...');
    // console.log({ id, payload });
    try {
      const res = await updateTutorFeaturedStatusAction(id, payload);
      if (res.error) {
        return toast.error(res.error.message, { id: toastSlug });
      }
      toast.success('Tutor profile featured ✅', { id: toastSlug });
    } catch (error) {
      toast.error('Something Went Wrong', { id: toastSlug });
    }
  };

  const makeUnFeatured = async (
    id: string,
    payload: { isFeatured: boolean },
  ) => {
    const toastSlug = toast.loading('Making tutor un-featured...');
    // console.log({ id, payload });
    try {
      const res = await updateTutorFeaturedStatusAction(id, payload);
      if (res.error) {
        return toast.error(res.error.message, { id: toastSlug });
      }
      toast.success('Made tutor profile un-featured ❌', { id: toastSlug });
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
            <TableHead>Subjects</TableHead>
            <TableHead>Experience (Years)</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Hourly Rate</TableHead>
            <TableHead>Total Reviews</TableHead>
            <TableHead>Average Rating</TableHead>

            <TableHead>Is Featured</TableHead>
            <TableHead>Feature/Un-Feature</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tutors.map(tutor => {
            // const tutor = user.tutorProfile;
            // const availability = user.availability;

            return (
              <TableRow key={tutor.id}>
                <TableCell className="font-medium">
                  {tutor?.name ?? 'Tutor'}
                </TableCell>

                <TableCell className="flex flex-wrap gap-1 items-center">
                  {tutor?.tutorCategories?.map((ct: any) => (
                    <Badge key={ct?.id} variant="outline">
                      {ct?.category?.name}
                    </Badge>
                  )) ?? '—'}
                </TableCell>

                <TableCell className="text-center">
                  {tutor?.experienceYears ?? 'NA'}
                </TableCell>

                <TableCell>
                  {tutor?.createdAt
                    ? new Date(tutor.createdAt).toLocaleString([], {
                        year: '2-digit',
                        month: '2-digit',
                        // day: '2-digit',
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'N/A'}
                </TableCell>

                <TableCell className="text-center">
                  €{tutor?.hourlyRate ?? 'NA'}
                </TableCell>

                <TableCell className="text-center">
                  {tutor?.totalReviews ?? 0}
                </TableCell>

                <TableCell className="text-center">
                  {tutor?.ratingAvg ? Number(tutor.ratingAvg).toFixed(2) : 'NA'}
                </TableCell>

                {/* isFeatured */}

                {/* <TableCell className="text-center">
                  {tutor?.isFeatured ? 'Yes' : 'No'}
                </TableCell> */}

                <TableCell className="flex flex-row gap-2 justify-center">
                  <p className="flex-1 text-center">
                    {' '}
                    {tutor?.isFeatured ? 'Yes' : 'No'}
                  </p>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex-1 flex flex-row gap-1 justify-center">
                    {/* make featured */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon-xs"
                          variant="outline"
                          disabled={Boolean(tutor?.isFeatured)}
                          onClick={() =>
                            makeFeatured(tutor?.id, {
                              isFeatured: true,
                            })
                          }
                          className="text-xs"
                        >
                          ✅
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Make Featured</p>
                      </TooltipContent>
                    </Tooltip>
                    {/* make un featured */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="icon-xs"
                          variant="outline"
                          disabled={!Boolean(tutor?.isFeatured)}
                          onClick={() =>
                            makeUnFeatured(tutor?.id, {
                              isFeatured: false,
                            })
                          }
                          className="text-xs"
                        >
                          ❌
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Disable Featured</p>
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

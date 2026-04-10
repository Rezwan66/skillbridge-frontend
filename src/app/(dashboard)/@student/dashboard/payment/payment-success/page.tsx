import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default async function PaymentSuccessPage({ searchParams }: { searchParams: Promise<any> }) {
  const resolvedParams = await searchParams;
  const bookingId = resolvedParams?.booking_id;
  const paymentId = resolvedParams?.payment_id;
  const tutorName = resolvedParams?.tutor_name;
  const amount = resolvedParams?.amount;
  const startTime = resolvedParams?.start_time ? new Date(resolvedParams.start_time).toLocaleString() : null;

  return (
    <div className="flex w-full items-center justify-center p-6 mt-10">
      <Card className="w-full max-w-md text-center shadow-lg border-green-100">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle className="w-20 h-20 text-green-500 mb-4 animate-bounce" />
          <CardTitle className="text-2xl font-bold text-green-700">Payment Successful!</CardTitle>
          <CardDescription>
            Your transaction was completed seamlessly.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-3">
           <p>Thank you for securely checking out with Stripe.</p>
           
           <div className="bg-secondary/20 p-4 rounded-md space-y-2 border text-left">
             <h4 className="font-semibold text-foreground mb-3 text-center border-b pb-2">Session Details</h4>
             {tutorName && <p><strong>Tutor:</strong> <span className="text-foreground">{tutorName}</span></p>}
             {amount && <p><strong>Total Amount:</strong> <span className="text-foreground">€{amount}</span></p>}
             {startTime && <p><strong>Scheduled Time:</strong> <span className="text-foreground">{startTime}</span></p>}
             {bookingId && <p><strong>Booking ID:</strong> <span className="text-xs break-all">{bookingId}</span></p>}
             {paymentId && <p><strong>Payment ID:</strong> <span className="text-xs break-all">{paymentId}</span></p>}
           </div>

           <p className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md italic">
             Note: It might take a moment for your updated payment status to reflect across the dashboard based on Stripe&apos;s secure Webhook response.
           </p>
        </CardContent>
        <CardFooter className="flex justify-center mt-6">
           <Link href="/dashboard/bookings">
             <Button variant="default">Return to My Bookings</Button>
           </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

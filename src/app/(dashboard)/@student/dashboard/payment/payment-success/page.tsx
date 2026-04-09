import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentSuccessPage({ searchParams }: { searchParams: any }) {
  const bookingId = searchParams?.booking_id;
  const paymentId = searchParams?.payment_id;

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
        <CardContent className="text-sm text-muted-foreground space-y-2">
           <p>Thank you for securely checking out with Stripe.</p>
           {bookingId && <p><strong>Booking ID:</strong> {bookingId}</p>}
           {paymentId && <p><strong>Payment ID:</strong> {paymentId}</p>}
           <p className="mt-4 p-3 bg-secondary rounded-md italic">
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

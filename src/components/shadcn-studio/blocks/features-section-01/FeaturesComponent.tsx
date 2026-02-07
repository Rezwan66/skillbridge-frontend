import type { ComponentType } from 'react';

import { ArrowRightIcon } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { cn } from '@/lib/utils';

type Features = {
  icon: ComponentType;
  title: string;
  description: string;
  cardBorderColor: string;
  avatarTextColor: string;
  avatarBgColor: string;
}[];

const Features = ({ featuresList }: { featuresList: Features }) => {
  return (
    <section className="py-16 container overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">
            Discover the Exclusive Perks Today
          </h2>
          <p className="mt-2 text-muted-foreground">
            Explore key features to enhance your study experience with intuitive
            navigation, robust security, and seamless functionality.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((features, index) => (
            <Card
              key={index}
              className={cn(
                'shadow-none transition-colors duration-300 py-4',
                features.cardBorderColor,
              )}
            >
              <CardContent>
                <Avatar
                  className={cn(
                    'mb-6 size-10 rounded-md',
                    features.avatarTextColor,
                  )}
                >
                  <AvatarFallback
                    className={cn(
                      'rounded-md [&>svg]:size-6',
                      features.avatarBgColor,
                    )}
                  >
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className="mb-2 text-lg font-semibold">{features.title}</h6>
                <p className="text-muted-foreground">{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

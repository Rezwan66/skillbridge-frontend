'use client';

import { motion } from 'framer-motion';
import { Users, BookOpen, Star, GraduationCap } from 'lucide-react';

const stats = [
  { id: 1, name: 'Active Students', value: '10,000+', icon: Users },
  { id: 2, name: 'Expert Tutors', value: '500+', icon: GraduationCap },
  { id: 3, name: 'Subjects Covered', value: '120+', icon: BookOpen },
  { id: 4, name: '5-Star Reviews', value: '4.9/5', icon: Star },
];

export function StatisticsSection() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Trusted by thousands worldwide</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our growing community of learners and educators achieving their goals.
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-primary/5 dark:bg-primary/10 rounded-2xl shadow-sm border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <dd className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-2">
                  {stat.value}
                </dd>
                <dt className="text-base leading-7 text-muted-foreground font-medium">
                  {stat.name}
                </dt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

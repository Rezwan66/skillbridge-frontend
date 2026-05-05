'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export function NewsletterSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Successfully subscribed to our newsletter!');
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div 
        className="absolute inset-0 rounded-3xl mx-4 lg:mx-8 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(/images/newsletter-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-white/85 dark:bg-black/85 backdrop-blur-[2px] rounded-3xl" />
      </div>
      
      <div className="container relative mx-auto px-4 z-10">
        <div className="max-w-2xl mx-auto text-center py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Stay ahead in your learning journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest study tips, featured tutors, and exclusive offers delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 bg-background h-12"
              />
              <Button type="submit" size="lg" className="h-12 w-full sm:w-auto">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground">
              We care about your data. Read our <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

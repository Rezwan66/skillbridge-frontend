'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="py-12 md:py-20 max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          Have a question about our platform? Interested in partnering with us? We'd love to hear from you. Send us a message and our team will respond within 24 hours.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-5 gap-12 lg:gap-20">
        {/* Contact Information */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2 space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email Us</h4>
                  <p className="text-muted-foreground mb-1">Our friendly team is here to help.</p>
                  <a href="mailto:hello@skillbridge.com" className="text-primary font-medium hover:underline">hello@skillbridge.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Our Office</h4>
                  <p className="text-muted-foreground mb-1">Come say hello at our HQ.</p>
                  <p className="font-medium">100 Innovation Drive<br/>Tech District, CA 94103</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg">Call Us</h4>
                  <p className="text-muted-foreground mb-1">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15550000000" className="font-medium hover:text-primary transition-colors">+1 (555) 000-0000</a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 mt-10">
            <h4 className="font-semibold mb-2">Support Hours</h4>
            <p className="text-sm text-muted-foreground">Our technical support team is available 24/7 for urgent matters. General inquiries are handled during regular business hours.</p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-3 bg-card rounded-3xl shadow-sm border p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required className="bg-background" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" required className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help you?" required className="bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us a little more about your inquiry..." 
                className="min-h-[150px] bg-background resize-y" 
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

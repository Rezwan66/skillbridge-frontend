'use client';

import { motion } from 'framer-motion';
import { BookOpen, Globe, Users, Award, Shield, Target } from 'lucide-react';
import Image from 'next/image';

const values = [
  {
    icon: <Globe className="w-8 h-8 text-primary" />,
    title: 'Global Access',
    description: 'We believe education should have no borders. Our platform connects students with expert tutors from around the world.',
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: 'Verified Quality',
    description: 'Every tutor on our platform undergoes a rigorous vetting process to ensure the highest standard of education.',
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: 'Community Driven',
    description: 'We foster a supportive environment where learners and educators can share knowledge and grow together.',
  },
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: 'Goal Oriented',
    description: 'Our tailored learning paths are designed to help you achieve your specific academic and professional goals.',
  },
];

const team = [
  { name: 'Shaikh Rezwan', role: 'Founder & CEO', seed: 'Shaikh' },
  { name: 'David Chen', role: 'Head of Education', seed: 'David' },
  { name: 'Elena Rodriguez', role: 'Community Lead', seed: 'Elena' },
  { name: 'Marcus Johnson', role: 'Technical Director', seed: 'Marcus' },
];

export default function AboutUs() {
  return (
    <div className="py-12 md:py-20 space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        >
          Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">Education</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground leading-relaxed"
        >
          Skillbridge was founded on a simple principle: everyone deserves access to high-quality personalized education. We're bridging the gap between passionate learners and expert educators worldwide.
        </motion.p>
      </section>

      {/* Our Values */}
      <section className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 md:p-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">These principles guide everything we do, from platform development to community management.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background p-8 rounded-2xl shadow-sm border border-border/50 flex gap-6 items-start"
            >
              <div className="p-4 bg-primary/10 rounded-xl shrink-0">
                {value.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Team */}
      <section className="px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">The passionate individuals working tirelessly behind the scenes to make Skillbridge the best learning platform possible.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center"
            >
              <div className="relative w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-colors">
                <Image 
                  src={`https://api.dicebear.com/9.x/notionists/svg?seed=${member.seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

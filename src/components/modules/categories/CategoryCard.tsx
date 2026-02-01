import { Card } from '@/components/ui/card';
import {
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Globe,
  Languages,
  Sigma,
} from 'lucide-react';

const categoryIcons: Record<string, any> = {
  Bengali: Languages,
  Deutsch: Languages,
  Mathematics: Calculator,
  Physics: Atom,
  Chemistry: FlaskConical,
  Biology: BookOpen,
  Geography: Globe,
};

type Category = {
  id: string;
  name: string;
};

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = categoryIcons[category.name] ?? Sigma;
  return (
    <Card className="min-w-[220px] px-6 py-5 flex items-center gap-4 hover:shadow-lg transition cursor-pointer">
      <div className="p-3 rounded-full bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <span className="text-lg font-semibold">{category.name}</span>
    </Card>
  );
}

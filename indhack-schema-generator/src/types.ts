export type SchemaType =
  | 'LocalBusiness'
  | 'FAQPage'
  | 'Article'
  | 'Organization'
  | 'Person'
  | 'Product'
  | 'HowTo'
  | 'Event'
  | 'BreadcrumbList';

export interface SchemaGeneratorProps {
  type?: SchemaType;
  defaultValues?: Record<string, unknown>;
  onGenerate?: (schema: Record<string, unknown>) => void;
  theme?: 'light' | 'dark';
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowToStep {
  name: string;
  text: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface OpeningHours {
  days: string[];
  opens: string;
  closes: string;
}

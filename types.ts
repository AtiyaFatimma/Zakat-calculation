
export type Language = 'en' | 'ar' | 'ur' | 'tr' | 'id' | 'ms' | 'bn' | 'fa' | 'fr' | 'so' | 'sw' | 'ha' | 'ps' | 'bs';

export type Madhab = 'hanafi' | 'shafi' | 'maliki' | 'hanbali';

export type Currency = 'USD' | 'SAR' | 'AED' | 'PKR' | 'TRY' | 'IDR' | 'MYR' | 'BDT' | 'EGP' | 'IRR' | 'EUR' | 'GBP';

export type AssetType = 'cash' | 'gold' | 'silver' | 'stocks' | 'business' | 'property' | 'other';

export type DonationCategory = 'zakat' | 'sadaqah' | 'fidya' | 'kaffarah' | 'general';

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    language: Language;
    currency: Currency;
    madhab: Madhab;
    theme: 'light' | 'dark' | 'auto';
    notifications: boolean;
  };
}

export interface Asset {
  id: string;
  type: AssetType;
  name: string;
  amount: number;
  currency: string;
  dateAdded: string;
  hawlDate: string;
  isPaid: boolean;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  category: DonationCategory;
  organization: string;
  date: string;
  notes?: string;
}

export interface ZakatCalculation {
  id: string;
  date: string;
  assets: {
    cash: number;
    goldGrams: number;
    silverGrams: number;
    stocks: number;
    business: number;
    property: number;
    other: number;
  };
  liabilities: number;
  nisabThreshold: number;
  nisabType: 'gold' | 'silver';
  totalZakatable: number;
  zakatAmount: number;
  aboveNisab: boolean;
}

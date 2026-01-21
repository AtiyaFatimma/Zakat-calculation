
export interface CurrencyInfo {
  name: string;
  symbol: string;
  code: string;
  flag: string;
}

export const currencies: Record<string, CurrencyInfo> = {
  // Major Global Currencies
  USD: { name: "US Dollar", symbol: "$", code: "USD", flag: "🇺🇸" },
  EUR: { name: "Euro", symbol: "€", code: "EUR", flag: "🇪🇺" },
  GBP: { name: "British Pound", symbol: "£", code: "GBP", flag: "🇬🇧" },
  
  // Middle East & North Africa
  SAR: { name: "Saudi Riyal", symbol: "﷼", code: "SAR", flag: "🇸🇦" },
  AED: { name: "UAE Dirham", symbol: "د.إ", code: "AED", flag: "🇦🇪" },
  QAR: { name: "Qatari Riyal", symbol: "﷼", code: "QAR", flag: "🇶🇦" },
  KWD: { name: "Kuwaiti Dinar", symbol: "د.ك", code: "KWD", flag: "🇰🇼" },
  BHD: { name: "Bahraini Dinar", symbol: "د.ب", code: "BHD", flag: "🇧🇭" },
  OMR: { name: "Omani Rial", symbol: "﷼", code: "OMR", flag: "🇴🇲" },
  JOD: { name: "Jordanian Dinar", symbol: "د.ا", code: "JOD", flag: "🇯🇴" },
  EGP: { name: "Egyptian Pound", symbol: "£", code: "EGP", flag: "🇪🇬" },
  LBP: { name: "Lebanese Pound", symbol: "ل.ل", code: "LBP", flag: "🇱🇧" },
  SYP: { name: "Syrian Pound", symbol: "£", code: "SYP", flag: "🇸🇾" },
  IQD: { name: "Iraqi Dinar", symbol: "ع.د", code: "IQD", flag: "🇮🇶" },
  MAD: { name: "Moroccan Dirham", symbol: "د.م.", code: "MAD", flag: "🇲🇦" },
  TND: { name: "Tunisian Dinar", symbol: "د.ت", code: "TND", flag: "🇹🇳" },
  DZD: { name: "Algerian Dinar", symbol: "د.ج", code: "DZD", flag: "🇩🇿" },
  LYD: { name: "Libyan Dinar", symbol: "ل.د", code: "LYD", flag: "🇱🇾" },
  
  // South Asia
  PKR: { name: "Pakistani Rupee", symbol: "₨", code: "PKR", flag: "🇵🇰" },
  INR: { name: "Indian Rupee", symbol: "₹", code: "INR", flag: "🇮🇳" },
  BDT: { name: "Bangladeshi Taka", symbol: "৳", code: "BDT", flag: "🇧🇩" },
  LKR: { name: "Sri Lankan Rupee", symbol: "₨", code: "LKR", flag: "🇱🇰" },
  NPR: { name: "Nepalese Rupee", symbol: "₨", code: "NPR", flag: "🇳🇵" },
  MVR: { name: "Maldivian Rufiyaa", symbol: "ރ.", code: "MVR", flag: "🇲🇻" },
  AFN: { name: "Afghan Afghani", symbol: "؋", code: "AFN", flag: "🇦🇫" },
  
  // Southeast Asia
  IDR: { name: "Indonesian Rupiah", symbol: "Rp", code: "IDR", flag: "🇮🇩" },
  MYR: { name: "Malaysian Ringgit", symbol: "RM", code: "MYR", flag: "🇲🇾" },
  SGD: { name: "Singapore Dollar", symbol: "S$", code: "SGD", flag: "🇸🇬" },
  BND: { name: "Brunei Dollar", symbol: "B$", code: "BND", flag: "🇧🇳" },
  THB: { name: "Thai Baht", symbol: "฿", code: "THB", flag: "🇹🇭" },
  
  // Central & West Asia
  TRY: { name: "Turkish Lira", symbol: "₺", code: "TRY", flag: "🇹🇷" },
  IRR: { name: "Iranian Rial", symbol: "﷼", code: "IRR", flag: "🇮🇷" },
  AZN: { name: "Azerbaijani Manat", symbol: "₼", code: "AZN", flag: "🇦🇿" },
  KZT: { name: "Kazakhstani Tenge", symbol: "₸", code: "KZT", flag: "🇰🇿" },
  UZS: { name: "Uzbekistani Som", symbol: "so'm", code: "UZS", flag: "🇺🇿" },
  TJS: { name: "Tajikistani Somoni", symbol: "ЅМ", code: "TJS", flag: "🇹🇯" },
  TMT: { name: "Turkmen Manat", symbol: "m", code: "TMT", flag: "🇹🇲" },
  KGS: { name: "Kyrgyzstani Som", symbol: "с", code: "KGS", flag: "🇰🇬" },
  
  // Africa
  NGN: { name: "Nigerian Naira", symbol: "₦", code: "NGN", flag: "🇳🇬" },
  ZAR: { name: "South African Rand", symbol: "R", code: "ZAR", flag: "🇿🇦" },
  KES: { name: "Kenyan Shilling", symbol: "KSh", code: "KES", flag: "🇰🇪" },
  TZS: { name: "Tanzanian Shilling", symbol: "TSh", code: "TZS", flag: "🇹🇿" },
  UGX: { name: "Ugandan Shilling", symbol: "USh", code: "UGX", flag: "🇺🇬" },
  ETB: { name: "Ethiopian Birr", symbol: "Br", code: "ETB", flag: "🇪🇹" },
  SOS: { name: "Somali Shilling", symbol: "Sh", code: "SOS", flag: "🇸🇴" },
  SDG: { name: "Sudanese Pound", symbol: "£", code: "SDG", flag: "🇸🇩" },
  GHS: { name: "Ghanaian Cedi", symbol: "₵", code: "GHS", flag: "🇬🇭" },
  
  // Europe
  CHF: { name: "Swiss Franc", symbol: "Fr", code: "CHF", flag: "🇨🇭" },
  NOK: { name: "Norwegian Krone", symbol: "kr", code: "NOK", flag: "🇳🇴" },
  SEK: { name: "Swedish Krona", symbol: "kr", code: "SEK", flag: "🇸🇪" },
  DKK: { name: "Danish Krone", symbol: "kr", code: "DKK", flag: "🇩🇰" },
  RUB: { name: "Russian Ruble", symbol: "₽", code: "RUB", flag: "🇷🇺" },
  BAM: { name: "Bosnian Mark", symbol: "KM", code: "BAM", flag: "🇧🇦" },
  ALL: { name: "Albanian Lek", symbol: "L", code: "ALL", flag: "🇦🇱" },
  
  // East Asia & Pacific
  CNY: { name: "Chinese Yuan", symbol: "¥", code: "CNY", flag: "🇨🇳" },
  JPY: { name: "Japanese Yen", symbol: "¥", code: "JPY", flag: "🇯🇵" },
  KRW: { name: "South Korean Won", symbol: "₩", code: "KRW", flag: "🇰🇷" },
  AUD: { name: "Australian Dollar", symbol: "A$", code: "AUD", flag: "🇦🇺" },
  NZD: { name: "New Zealand Dollar", symbol: "NZ$", code: "NZD", flag: "🇳🇿" },
  
  // Americas
  CAD: { name: "Canadian Dollar", symbol: "C$", code: "CAD", flag: "🇨🇦" },
  MXN: { name: "Mexican Peso", symbol: "$", code: "MXN", flag: "🇲🇽" },
  BRL: { name: "Brazilian Real", symbol: "R$", code: "BRL", flag: "🇧🇷" },
  ARS: { name: "Argentine Peso", symbol: "$", code: "ARS", flag: "🇦🇷" }
};

export const defaultRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  SAR: 3.75,
  AED: 3.67,
  PKR: 280,
  INR: 83,
  TRY: 32,
  IDR: 15700,
  MYR: 4.47,
  BDT: 110,
  EGP: 48,
  CAD: 1.36,
  AUD: 1.52,
  KWD: 0.31,
  QAR: 3.64
};

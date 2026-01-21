
import { Language } from './types';

export const rtlLanguages: Language[] = ['ar', 'ur', 'fa', 'ps'];

// Change type to Partial to avoid errors when some languages are missing translations
export const translations: Partial<Record<Language, any>> = {
  en: {
    common: {
      app_name: "Zakat Tracker",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
      add: "Add",
      back: "Back",
      next: "Next",
      loading: "Loading...",
      success: "Success!",
      error: "Error occurred"
    },
    chatbot: {
      title: "Zakat Assistant",
      placeholder: "Ask about Zakat rules, Nisab...",
      greeting: "Assalamu Alaikum! I'm your Zakat assistant. How can I help you today?",
      suggest_nisab: "What is Nisab?",
      suggest_calculation: "Help me calculate",
      suggest_recipients: "Who can receive Zakat?",
      error: "Sorry, I'm having trouble connecting. Please try again."
    },
    tools: {
      currency_converter: "Currency Converter",
      last_updated: "Last updated",
      exchange_rate: "Exchange Rate",
      convert: "Convert"
    },
    nav: {
      home: "Home",
      calculator: "Calculator",
      assets: "Assets",
      donations: "Donations",
      reports: "Reports",
      settings: "Settings"
    },
    dashboard: {
      greeting: "Assalamu Alaikum",
      total_assets: "Total Assets",
      zakat_due: "Zakat Due",
      zakat_paid: "Zakat Paid (Year)",
      sadaqah_given: "Sadaqah Given",
      quick_actions: "Quick Actions",
      add_asset: "Add Asset",
      log_donation: "Log Donation",
      calculate_zakat: "Calculate",
      recent_activity: "Recent Activity",
      hijri_date: "Hijri Date"
    },
    calculator: {
      title: "Zakat Calculator",
      subtitle: "Calculate your obligation",
      nisab_info: "Current Nisab Threshold",
      assets_section: "Your Assets",
      cash_savings: "Cash & Savings",
      gold_weight: "Gold (grams)",
      silver_weight: "Silver (grams)",
      stocks: "Stocks & Investments",
      business: "Business Inventory",
      property: "Investment Properties",
      other: "Other Assets",
      liabilities_section: "Liabilities",
      short_term_debts: "Short-term Debts",
      calculation_method: "Nisab Basis",
      gold_based: "Gold",
      silver_based: "Silver",
      total_assets: "Zakatable Assets",
      total_liabilities: "Total Liabilities",
      net_assets: "Net Wealth",
      zakat_amount: "Zakat Amount (2.5%)",
      above_nisab: "Wealth is above Nisab",
      below_nisab: "Wealth is below Nisab",
      calculate_btn: "Calculate Now",
      save_calculation: "Save Result",
      currency_note: "Enter amounts in any currency. They will be converted automatically."
    },
    assets: {
      title: "My Assets",
      add_new: "Add New Asset",
      asset_type: "Asset Type",
      amount: "Amount",
      status: "Status",
      paid: "Paid",
      pending: "Pending",
      total_value: "Total Value",
      no_assets: "No assets yet. Add one to start."
    },
    donations: {
      title: "Donation Tracker",
      log_donation: "Log Donation",
      amount: "Amount",
      category: "Category",
      zakat: "Zakat",
      sadaqah: "Sadaqah",
      fidya: "Fidya",
      kaffarah: "Kaffarah",
      general: "General",
      organization: "Organization",
      date: "Date",
      no_donations: "No donations yet."
    },
    settings: {
      title: "Settings",
      language: "Language",
      currency: "Primary Currency",
      primary_currency_desc: "All calculations will be shown in this currency",
      number_format: "Number Format",
      auto_update_rates: "Auto-update Exchange Rates",
      auto_update_rates_desc: "Automatically fetch latest rates every 24 hours",
      show_conversions: "Show Currency Conversions",
      show_conversions_desc: "Display asset values in your primary currency",
      theme: "Theme",
      madhab: "Madhab",
      light: "Light",
      dark: "Dark",
      logout: "Logout"
    },
    reports: {
      title: "Impact Reports",
      donations_by_currency: "Donations by Currency",
      export_pdf: "Export PDF"
    }
  },
  ar: {
    common: {
      app_name: "متتبع الزكاة",
      save: "حفظ",
      cancel: "إلغاء",
      delete: "حذف",
      edit: "تعديل",
      confirm: "تأكيد",
      add: "إضافة",
      back: "رجوع",
      next: "التالي",
      loading: "جاري التحميل...",
      success: "تم بنجاح!",
      error: "حدث خطأ"
    },
    chatbot: {
      title: "مساعد الزكاة",
      placeholder: "اسأل عن أحكام الزكاة، النصاب...",
      greeting: "السلام عليكم! أنا مساعدك الخاص بالزكاة. كيف يمكنني مساعدتك اليوم؟",
      suggest_nisab: "ما هو النصاب؟",
      suggest_calculation: "ساعدني في الحساب",
      suggest_recipients: "من هم مصارف الزكاة؟"
    },
    tools: {
      currency_converter: "محول العملات",
      last_updated: "آخر تحديث",
      exchange_rate: "سعر الصرف",
      convert: "تحويل"
    },
    nav: {
      home: "الرئيسية",
      calculator: "الحاسبة",
      assets: "أصولي",
      donations: "التبرعات",
      reports: "التقارير",
      settings: "الإعدادات"
    },
    dashboard: {
      greeting: "السلام عليكم",
      total_assets: "إجمالي الأصول",
      zakat_due: "الزكاة المستحقة",
      zakat_paid: "الزكاة المدفوعة",
      sadaqah_given: "الصدقات المقدمة",
      quick_actions: "إجراءات سريعة",
      add_asset: "إضافة أصل",
      log_donation: "تسجيل تبرع",
      calculate_zakat: "حساب الزكاة",
      recent_activity: "النشاط الأخير",
      hijri_date: "التاريخ الهجري"
    },
    settings: {
      title: "الإعدادات",
      language: "اللغة",
      currency: "العملة الأساسية",
      primary_currency_desc: "سيتم عرض جميع الحسابات بهذه العملة",
      auto_update_rates: "تحديث تلقائي لأسعار الصرف",
      show_conversions: "إظهار تحويل العملات",
      theme: "المظهر",
      madhab: "المذهب",
      light: "فاتح",
      dark: "داكن",
      logout: "تسجيل الخروج"
    },
    reports: {
      title: "التقارير",
      donations_by_currency: "التبرعات حسب العملة",
      export_pdf: "تصدير PDF"
    }
  },
  ur: {
    common: {
      app_name: "زکوٰۃ ٹریکر",
      save: "محفوظ کریں",
      cancel: "منسوخ کریں",
      delete: "حذف کریں",
      edit: "ترمیم کریں",
      confirm: "تصدیق کریں",
      add: "شامل کریں",
      back: "واپس",
      next: "اگلا",
      loading: "لوڈ ہو رہا ہے...",
      success: "کامیاب!",
      error: "خرابی"
    },
    chatbot: {
      title: "زکوٰۃ اسسٹنٹ",
      placeholder: "زکوٰۃ کے مسائل پوچھیں...",
      greeting: "السلام علیکم! میں آپ کا زکوٰۃ اسسٹنٹ ہوں۔ آج میں آپ کی کیا مدد کر سکتا ہوں؟"
    },
    tools: {
      currency_converter: "کرنسی تبدیل کار",
      last_updated: "آخری اپ ڈیٹ",
      exchange_rate: "شرح تبادلہ"
    },
    settings: {
      primary_currency: "بنیادی کرنسی",
      number_format: "نمبر فارمیٹ",
      auto_update_rates: "شرح تبادلہ خودکار اپ ڈیٹ"
    },
    nav: {
      home: "ہوم",
      calculator: "کیلکولیٹر",
      assets: "اثاثے",
      donations: "عطیات",
      reports: "رپورٹس",
      settings: "ترتیبات"
    },
    dashboard: {
      greeting: "السلام علیکم",
      total_assets: "کل اثاثے",
      zakat_due: "واجب الادا زکوٰۃ",
      zakat_paid: "ادا شدہ زکوٰۃ",
      sadaqah_given: "صدقات",
      quick_actions: "فوری کام",
      add_asset: "اثاثہ شامل کریں",
      log_donation: "عطیہ لکھیں",
      calculate_zakat: "حساب کریں",
      recent_activity: "حالیہ کام",
      hijri_date: "ہجری تاریخ"
    }
  }
};

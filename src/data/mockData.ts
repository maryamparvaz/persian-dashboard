
export interface Order {
  id: string;
  trackingCode: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'returned';
  price: string;
  createdAt: string;
  estimatedDelivery: string;
  courierName?: string;
  courierPhone?: string;
  notes?: string;
  // Additional properties needed by components
  date: string;
  amount: string;
  origin: string;
  destination: string;
  weight: string;
  items: {
    name: string;
    code: string;
    quantity: number;
  }[];
  timeline: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    status: 'completed' | 'current' | 'pending';
  }[];
}

// Utility functions for status handling
export const getStatusText = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'در انتظار';
    case 'in-transit':
      return 'در حال ارسال';
    case 'delivered':
      return 'تحویل شده';
    case 'returned':
      return 'مرجوعی';
    default:
      return 'نامشخص';
  }
};

export const getStatusColor = (status: Order['status']): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'in-transit':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'returned':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const mockOrders: Order[] = [
  {
    id: '1',
    trackingCode: 'TRK001234567',
    recipientName: 'علی احمدی',
    recipientPhone: '09123456789',
    address: 'تهران، میدان ولیعصر، خیابان کریمخان، پلاک ۱۲۳',
    status: 'delivered',
    price: '250,000 تومان',
    createdAt: '۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۷',
    courierName: 'محمد رضایی',
    courierPhone: '09187654321',
    notes: 'تحویل در ساعات اداری',
    date: '۱۴۰۳/۰۹/۱۵',
    amount: '۲۵۰,۰۰۰ تومان',
    origin: 'تهران',
    destination: 'کرج',
    weight: '۲.۵',
    items: [
      { name: 'کتاب فیزیک', code: 'BOOK001', quantity: 2 },
      { name: 'دفتر ۱۰۰ برگ', code: 'NOTE001', quantity: 5 }
    ],
    timeline: [
      {
        id: '1',
        title: 'سفارش ثبت شد',
        description: 'سفارش شما با موفقیت ثبت شد',
        timestamp: '۱۴۰۳/۰۹/۱۵ - ۱۴:۳۰',
        status: 'completed'
      },
      {
        id: '2',
        title: 'آماده‌سازی برای ارسال',
        description: 'بسته‌بندی کامل شد',
        timestamp: '۱۴۰۳/۰۹/۱۵ - ۱۶:۰۰',
        status: 'completed'
      },
      {
        id: '3',
        title: 'ارسال شد',
        description: 'مرسوله تحویل پیک شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۰۹:۰۰',
        status: 'completed'
      },
      {
        id: '4',
        title: 'تحویل داده شد',
        description: 'بسته با موفقیت تحویل گیرنده شد',
        timestamp: '۱۴۰۳/۰۹/۱۷ - ۱۱:۳۰',
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    trackingCode: 'TRK001234568',
    recipientName: 'فاطمه کریمی',
    recipientPhone: '09198765432',
    address: 'اصفهان، خیابان چهارباغ، کوچه گلستان، پلاک ۴۵',
    status: 'in-transit',
    price: '180,000 تومان',
    createdAt: '۱۴۰۳/۰۹/۱۶ - ۱۰:۱۵',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۸',
    courierName: 'حسن محمدی',
    courierPhone: '09176543210',
    date: '۱۴۰۳/۰۹/۱۶',
    amount: '۱۸۰,۰۰۰ تومان',
    origin: 'تهران',
    destination: 'اصفهان',
    weight: '۱.۸',
    items: [
      { name: 'لوازم آرایش', code: 'COSM001', quantity: 3 }
    ],
    timeline: [
      {
        id: '1',
        title: 'سفارش ثبت شد',
        description: 'سفارش شما با موفقیت ثبت شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۱۰:۱۵',
        status: 'completed'
      },
      {
        id: '2',
        title: 'آماده‌سازی برای ارسال',
        description: 'بسته‌بندی کامل شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۱۴:۳۰',
        status: 'completed'
      },
      {
        id: '3',
        title: 'ارسال شد',
        description: 'مرسوله تحویل پیک شد',
        timestamp: '۱۴۰۳/۰۹/۱۷ - ۰۸:۰۰',
        status: 'current'
      },
      {
        id: '4',
        title: 'تحویل',
        description: 'در حال تحویل به گیرنده',
        timestamp: '۱۴۰۳/۰۹/۱۸ - ۱۲:۰۰',
        status: 'pending'
      }
    ]
  },
  {
    id: '3',
    trackingCode: 'TRK001234569',
    recipientName: 'رضا نوری',
    recipientPhone: '09112345678',
    address: 'شیراز، خیابان زند، کوچه نارنج، پلاک ۷۸',
    status: 'pending',
    price: '320,000 تومان',
    createdAt: '۱۴۰۳/۰۹/۱۷ - ۰۹:۴۵',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۹',
    date: '۱۴۰۳/۰۹/۱۷',
    amount: '۳۲۰,۰۰۰ تومان',
    origin: 'تهران',
    destination: 'شیراز',
    weight: '۳.۲',
    items: [
      { name: 'لپ تاپ', code: 'LAPTOP001', quantity: 1 },
      { name: 'ماوس', code: 'MOUSE001', quantity: 1 }
    ],
    timeline: [
      {
        id: '1',
        title: 'سفارش ثبت شد',
        description: 'سفارش شما با موفقیت ثبت شد',
        timestamp: '۱۴۰۳/۰۹/۱۷ - ۰۹:۴۵',
        status: 'completed'
      },
      {
        id: '2',
        title: 'آماده‌سازی برای ارسال',
        description: 'در حال بسته‌بندی',
        timestamp: 'در انتظار',
        status: 'current'
      },
      {
        id: '3',
        title: 'ارسال',
        description: 'آماده ارسال',
        timestamp: 'در انتظار',
        status: 'pending'
      },
      {
        id: '4',
        title: 'تحویل',
        description: 'تحویل به گیرنده',
        timestamp: 'در انتظار',
        status: 'pending'
      }
    ]
  },
  {
    id: '4',
    trackingCode: 'TRK001234570',
    recipientName: 'مریم صادقی',
    recipientPhone: '09365478912',
    address: 'مشهد، خیابان امام رضا، کوچه سلامت، پلاک ۱۵۶',
    status: 'returned',
    price: '150,000 تومان',
    createdAt: '۱۴۰۳/۰۹/۱۴ - ۱۶:۲۰',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۶',
    courierName: 'احمد جعفری',
    courierPhone: '09158888777',
    notes: 'آدرس نادرست - مرجوع شد',
    date: '۱۴۰۳/۰۹/۱۴',
    amount: '۱۵۰,۰۰۰ تومان',
    origin: 'تهران',
    destination: 'مشهد',
    weight: '۱.۰',
    items: [
      { name: 'عطر', code: 'PERF001', quantity: 2 }
    ],
    timeline: [
      {
        id: '1',
        title: 'سفارش ثبت شد',
        description: 'سفارش شما با موفقیت ثبت شد',
        timestamp: '۱۴۰۳/۰۹/۱۴ - ۱۶:۲۰',
        status: 'completed'
      },
      {
        id: '2',
        title: 'آماده‌سازی برای ارسال',
        description: 'بسته‌بندی کامل شد',
        timestamp: '۱۴۰۳/۰۹/۱۵ - ۰۸:۰۰',
        status: 'completed'
      },
      {
        id: '3',
        title: 'ارسال شد',
        description: 'مرسوله تحویل پیک شد',
        timestamp: '۱۴۰۳/۰۹/۱۵ - ۱۲:۰۰',
        status: 'completed'
      },
      {
        id: '4',
        title: 'مرجوع شد',
        description: 'به دلیل آدرس نادرست مرجوع شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۱۵:۳۰',
        status: 'completed'
      }
    ]
  },
  {
    id: '5',
    trackingCode: 'TRK001234571',
    recipientName: 'حسین موسوی',
    recipientPhone: '09127894561',
    address: 'تبریز، خیابان ولیعهد، کوچه آزادی، پلاک ۲۳۴',
    status: 'in-transit',
    price: '420,000 تومان',
    createdAt: '۱۴۰۳/۰۹/۱۶ - ۱۳:۱۰',
    estimatedDelivery: '۱۴۰۳/۰۹/۱۸',
    courierName: 'مهدی زارعی',
    courierPhone: '09141234567',
    date: '۱۴۰۳/۰۹/۱۶',
    amount: '۴۲۰,۰۰۰ تومان',
    origin: 'تهران',
    destination: 'تبریز',
    weight: '۴.۵',
    items: [
      { name: 'کتاب مرجع', code: 'REFBOOK001', quantity: 10 },
      { name: 'فلش مموری', code: 'USB001', quantity: 2 }
    ],
    timeline: [
      {
        id: '1',
        title: 'سفارش ثبت شد',
        description: 'سفارش شما با موفقیت ثبت شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۱۳:۱۰',
        status: 'completed'
      },
      {
        id: '2',
        title: 'آماده‌سازی برای ارسال',
        description: 'بسته‌بندی کامل شد',
        timestamp: '۱۴۰۳/۰۹/۱۶ - ۱۷:۰۰',
        status: 'completed'
      },
      {
        id: '3',
        title: 'ارسال شد',
        description: 'مرسوله تحویل پیک شد',
        timestamp: '۱۴۰۳/۰۹/۱۷ - ۰۷:۳۰',
        status: 'current'
      },
      {
        id: '4',
        title: 'تحویل',
        description: 'در حال تحویل به گیرنده',
        timestamp: '۱۴۰۳/۰۹/۱۸ - ۱۰:۰۰',
        status: 'pending'
      }
    ]
  }
];


import { useState } from 'react';
import { Search, Bell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { OrderCard } from '@/components/OrderCard';
import { OrderDetails } from '@/components/OrderDetails';
import { UserProfile } from '@/components/UserProfile';
import { OrderFilters } from '@/components/OrderFilters';
import { FeedbackForm } from '@/components/FeedbackForm';
import { mockOrders, Order } from '@/data/mockData';

interface FilterState {
  dateRange: { from: string; to: string };
  orderNumber: string;
  amountRange: { min: string; max: string };
  status: string;
}

const Index = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    dateRange: { from: '', to: '' },
    orderNumber: '',
    amountRange: { min: '', max: '' },
    status: 'all'
  });

  const filteredOrders = mockOrders.filter(order => {
    // Basic filter
    const matchesBasicFilter = activeFilter === 'all' || order.status === activeFilter;
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      order.trackingCode.includes(searchQuery) ||
      order.recipientName.includes(searchQuery);

    // Advanced filters
    const matchesOrderNumber = !advancedFilters.orderNumber || 
      order.trackingCode.includes(advancedFilters.orderNumber);
      
    const matchesStatus = advancedFilters.status === 'all' || 
      order.status === advancedFilters.status;

    // Amount filter
    const orderAmount = parseFloat(order.price?.replace(/[^\d]/g, '') || '0');
    const minAmount = parseFloat(advancedFilters.amountRange.min) || 0;
    const maxAmount = parseFloat(advancedFilters.amountRange.max) || Infinity;
    const matchesAmount = orderAmount >= minAmount && orderAmount <= maxAmount;

    return matchesBasicFilter && matchesSearch && matchesOrderNumber && matchesStatus && matchesAmount;
  });

  const handleAdvancedFilterChange = (filters: FilterState) => {
    setAdvancedFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#2b2f3b]">
      <div className="flex">
        {/* Sidebar - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:block">
          <Sidebar 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <UserProfile />

          {/* Content */}
          <main className="p-3 lg:p-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="w-full dark:bg-[#3b3d49] dark:border-[#4a4d57] dark:text-white dark:hover:bg-[#4a4d57]"
              >
                {showFilters ? 'مخفی کردن فیلترها' : 'نمایش فیلترها'}
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Filters Panel - Full width on mobile, fixed width on desktop */}
              <div className={`w-full lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                <OrderFilters onFilterChange={handleAdvancedFilterChange} />
              </div>

              {/* Orders Table */}
              <div className="flex-1">
                <div className="bg-card rounded-lg border border-border overflow-hidden dark:bg-[#3b3d49] dark:border-[#4a4d57]">
                  {/* Mobile Card View */}
                  <div className="lg:hidden">
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground dark:text-gray-400">
                        هیچ سفارشی با فیلتر انتخابی یافت نشد
                      </div>
                    ) : (
                      <div className="divide-y divide-border dark:divide-[#4a4d57]">
                        {filteredOrders.map((order, index) => (
                          <div key={order.id} className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-sm font-medium persian-numbers text-foreground dark:text-white">شماره: {index + 1}</div>
                                  <div className="text-sm text-muted-foreground persian-numbers mt-1 dark:text-gray-400">{order.date}</div>
                                </div>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                  ${order.status === 'delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 
                                    order.status === 'in-transit' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                                    order.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                                    'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}>
                                  {order.status === 'delivered' ? 'تحویل شده' :
                                   order.status === 'in-transit' ? 'در حال ارسال' :
                                   order.status === 'pending' ? 'در انتظار' : 'مرجوعی'}
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground dark:text-gray-400">مبلغ:</span>
                                  <span className="persian-numbers text-primary mr-2 dark:text-blue-400">{order.amount}</span>
                                </div>
                                <div>
                                  <span className="text-muted-foreground dark:text-gray-400">کد پیگیری:</span>
                                  <span className="persian-numbers font-mono mr-2 text-foreground dark:text-white">{order.trackingCode}</span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                                className="text-primary hover:text-primary/80 text-xs w-full dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-[#4a4d57]"
                              >
                                مشاهده جزئیات
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Desktop Table View */}
                  <div className="hidden lg:block">
                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 p-4 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground dark:border-[#4a4d57] dark:bg-[#2b2f3b] dark:text-gray-400">
                      <div className="text-center">شماره سفارش</div>
                      <div className="text-center">تاریخ سفارش</div>
                      <div className="text-center">مبلغ سفارش</div>
                      <div className="text-center">کد پیگیری</div>
                      <div className="text-center">وضعیت سفارش</div>
                      <div className="text-center">عملیات</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-border dark:divide-[#4a4d57]">
                      {filteredOrders.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground dark:text-gray-400">
                          هیچ سفارشی با فیلتر انتخابی یافت نشد
                        </div>
                      ) : (
                        filteredOrders.map((order, index) => (
                          <div key={order.id} className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-muted/50 dark:hover:bg-[#4a4d57] text-foreground dark:text-white">
                            <div className="text-center persian-numbers font-medium">{index + 1}</div>
                            <div className="text-center persian-numbers">{order.date}</div>
                            <div className="text-center persian-numbers text-primary dark:text-blue-400">{order.amount}</div>
                            <div className="text-center persian-numbers font-mono">{order.trackingCode}</div>
                            <div className="text-center">
                              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                                ${order.status === 'delivered' ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 
                                  order.status === 'in-transit' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300' :
                                  order.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300' :
                                  'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300'}`}>
                                {order.status === 'delivered' ? 'تحویل شده' :
                                 order.status === 'in-transit' ? 'در حال ارسال' :
                                 order.status === 'pending' ? 'در انتظار' : 'مرجوعی'}
                              </span>
                            </div>
                            <div className="text-center">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                                className="text-primary hover:text-primary/80 text-xs dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-[#4a4d57]"
                              >
                                جزئیات
                              </Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom section with contact button - Responsive */}
                <div className="mt-6 bg-card rounded-lg border border-border p-4 dark:bg-[#3b3d49] dark:border-[#4a4d57]">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">شماره تماس</span>
                      <Button className="bg-muted hover:bg-muted/80 text-foreground dark:bg-[#4a4d57] dark:hover:bg-[#2b2f3b] dark:text-white dark:border-[#4a4d57]">
                        تماس با راننده
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      بازگردانی نشده
                    </div>
                  </div>
                </div>

                {/* Feedback button */}
                <div className="mt-4">
                  <Button 
                    onClick={() => setShowFeedbackForm(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 dark:bg-[#6589f0] dark:hover:bg-[#3b3d49] dark:text-white dark:border-[#4a4d57]"
                  >
                    ثبت بازخورد
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetails
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <FeedbackForm
          onClose={() => setShowFeedbackForm(false)}
        />
      )}
    </div>
  );
};

export default Index;

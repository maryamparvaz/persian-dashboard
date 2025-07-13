
import { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface OrderFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  dateRange: { from: string; to: string };
  orderNumber: string;
  amountRange: { min: string; max: string };
  status: string;
}

export function OrderFilters({ onFilterChange }: OrderFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: { from: '', to: '' },
    orderNumber: '',
    amountRange: { min: '', max: '' },
    status: 'all'
  });

  const [expandedSection, setExpandedSection] = useState<string | null>('date');

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      dateRange: { from: '', to: '' },
      orderNumber: '',
      amountRange: { min: '', max: '' },
      status: 'all'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'date',
      title: 'فیلتر بر اساس تاریخ و ساعت',
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300 ">از تاریخ</label>
            <Input
              type="date"
              value={filters.dateRange.from}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, from: e.target.value })}
              className="text-sm w-full dark:bg-[#2b2f3b]"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300">تا تاریخ</label>
            <Input
              type="date"
              value={filters.dateRange.to}
              onChange={(e) => handleFilterChange('dateRange', { ...filters.dateRange, to: e.target.value })}
              className="text-sm w-full dark:bg-[#2b2f3b]"
            />
          </div>
        </div>
      )
    },
    {
      id: 'orderNumber',
      title: 'فیلتر بر اساس شماره سفارش',
      content: (
        <div>
          <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300">شماره سفارش</label>
          <Input
            placeholder="شماره سفارش را وارد کنید..."
            value={filters.orderNumber}
            onChange={(e) => handleFilterChange('orderNumber', e.target.value)}
            className="text-sm w-full"
          />
        </div>
      )
    },
    {
      id: 'amount',
      title: 'فیلتر بر اساس مبلغ',
      content: (
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300">حداقل مبلغ (تومان)</label>
            <Input
              type="number"
              placeholder="۰"
              value={filters.amountRange.min}
              onChange={(e) => handleFilterChange('amountRange', { ...filters.amountRange, min: e.target.value })}
              className="text-sm w-full"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300">حداکثر مبلغ (تومان)</label>
            <Input
              type="number"
              placeholder="۱۰۰۰۰۰۰"
              value={filters.amountRange.max}
              onChange={(e) => handleFilterChange('amountRange', { ...filters.amountRange, max: e.target.value })}
              className="text-sm w-full"
            />
          </div>
        </div>
      )
    },
    {
      id: 'status',
      title: 'فیلتر بر اساس وضعیت سفارش',
      content: (
        <div>
          <label className="text-sm font-medium mb-1 block text-foreground dark:text-gray-300">وضعیت سفارش</label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger className="text-sm w-full">
              <SelectValue placeholder="انتخاب وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه سفارشات</SelectItem>
              <SelectItem value="pending">در انتظار</SelectItem>
              <SelectItem value="in-transit">در حال ارسال</SelectItem>
              <SelectItem value="delivered">تحویل شده</SelectItem>
              <SelectItem value="returned">مرجوعی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6 dark:bg-[#3b3d49] dark:border-[#4a4d57]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground dark:text-white">فیلترها</h3>
        <X className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
      </div>

      <div className="space-y-3">
        {sections.map((section) => (
          <div key={section.id} className="border-b border-border last:border-b-0 dark:border-[#4a4d57]">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between py-3 text-sm font-medium text-muted-foreground hover:text-foreground dark:text-gray-300 dark:hover:text-white"
            >
              <span>{section.title}</span>
              {expandedSection === section.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
            
            {expandedSection === section.id && (
              <div className="pb-4">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-border dark:border-[#4a4d57]">
        <Button onClick={applyFilters} className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-6 flex-1 sm:flex-none dark:bg-[#6589f0] dark:hover:bg-[#3b3d49] dark:text-white dark:border-[#4a4d57]">
          اعمال فیلترها
        </Button>
        <Button variant="outline" onClick={clearFilters} className="text-sm px-6 flex-1 sm:flex-none dark:bg-[#2b2f3b] dark:border-[#4a4d57] dark:text-white dark:hover:bg-[#4a4d57]">
          حذف فیلترها
        </Button>
      </div>
    </div>
  );
}

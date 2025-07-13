
import { X, Package, Calendar, MapPin, User, Phone, Weight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order, getStatusText, getStatusColor } from '@/data/mockData';

interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetails({ order, onClose }: OrderDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border dark:bg-[#2b2f3b] dark:border-[#3b3d49]">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/50 border-b border-border dark:bg-[#3b3d49] dark:border-[#4a4d57]">
          <CardTitle className="flex items-center gap-2 text-card-foreground dark:text-white">
            <Package className="h-5 w-5" />
            جزئیات سفارش {order.trackingCode}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground dark:text-white dark:hover:bg-[#4a4d57]">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6 bg-card dark:bg-[#2b2f3b]">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground dark:text-gray-400">وضعیت سفارش:</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">تاریخ سفارش:</span>
                <span className="persian-numbers text-foreground dark:text-white">{order.date}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Weight className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">وزن:</span>
                <span className="persian-numbers text-foreground dark:text-white">{order.weight} کیلوگرم</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground dark:text-gray-400">مبلغ کل:</span>
                <span className="font-medium persian-numbers text-foreground dark:text-white">{order.amount}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">مبدأ:</span>
                <span className="text-foreground dark:text-white">{order.origin}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">مقصد:</span>
                <span className="text-foreground dark:text-white">{order.destination}</span>
              </div>
            </div>
          </div>

          {/* Recipient Info */}
          <div className="border-t border-border pt-4 dark:border-[#4a4d57]">
            <h3 className="font-medium mb-3 text-foreground dark:text-white">اطلاعات گیرنده</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">نام:</span>
                <span className="text-foreground dark:text-white">{order.recipientName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground dark:text-gray-400" />
                <span className="text-muted-foreground dark:text-gray-400">تلفن:</span>
                <span className="persian-numbers text-foreground dark:text-white">{order.recipientPhone}</span>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="border-t border-border pt-4 dark:border-[#4a4d57]">
            <h3 className="font-medium mb-3 text-foreground dark:text-white">اقلام سفارش</h3>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-md border border-border dark:bg-[#3b3d49] dark:border-[#4a4d57]"
                >
                  <div>
                    <div className="font-medium text-foreground dark:text-white">{item.name}</div>
                    <div className="text-sm text-muted-foreground dark:text-gray-400">
                      کد: <span className="persian-numbers text-foreground dark:text-white">{item.code}</span>
                    </div>
                  </div>
                  <div className="text-sm text-foreground dark:text-white">
                    تعداد: <span className="persian-numbers font-medium">{item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-border dark:border-[#4a4d57]">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-[#4a4d57] dark:hover:bg-[#3b3d49] dark:text-white dark:border-[#4a4d57]">
              ثبت بازخورد
            </Button>
            <Button variant="outline" className="flex-1 dark:bg-[#2b2f3b] dark:border-[#4a4d57] dark:text-white dark:hover:bg-[#4a4d57]">
              تماس با پشتیبانی
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

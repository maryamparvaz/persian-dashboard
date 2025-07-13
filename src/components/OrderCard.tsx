
import { Package, Calendar, MapPin, User, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Order, getStatusText, getStatusColor } from '@/data/mockData';

interface OrderCardProps {
  order: Order;
  onViewDetails: () => void;
}

export function OrderCard({ order, onViewDetails }: OrderCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-muted-foreground" />
            <span className="font-mono text-sm font-medium">
              {order.trackingCode}
            </span>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {getStatusText(order.status)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">تاریخ:</span>
            <span className="persian-numbers">{order.date}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">مبلغ:</span>
            <span className="font-medium persian-numbers">{order.amount}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">مبدأ:</span>
            <span>{order.origin}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">مقصد:</span>
            <span>{order.destination}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.recipientName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="persian-numbers">{order.recipientPhone}</span>
            </div>
          </div>
          
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            جزئیات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

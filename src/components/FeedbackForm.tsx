
import React, { useState } from 'react';
import { X, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FeedbackFormProps {
  onClose: () => void;
}

export function FeedbackForm({ onClose }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { feedback, date, time });
    // Here you would typically send the feedback to your backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border dark:bg-[#2b2f3b] dark:border-[#3b3d49]">
        <CardHeader className="flex flex-row items-center justify-between bg-muted/50 border-b border-border dark:bg-[#3b3d49] dark:border-[#4a4d57]">
          <CardTitle className="text-lg font-semibold text-card-foreground dark:text-white">
            ثبت بازخورد برای سفارش ۱۲۸۷۷
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground hover:text-foreground dark:text-white dark:hover:bg-[#4a4d57]">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="bg-card dark:bg-[#2b2f3b]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="feedback" className="text-sm font-medium text-right block mb-2 text-foreground dark:text-white mt-3">
                نظر شما
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="لطفا نظر خود را وارد کنید..."
                className="min-h-[120px] text-right bg-background border-border text-foreground placeholder:text-muted-foreground dark:bg-[#3b3d49] dark:border-[#4a4d57] dark:text-white dark:placeholder:text-gray-400"
                dir="rtl"
              />
            </div>

           

            <div className="flex gap-2 pt-4">
              <Button 
                type="submit" 
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-[#4a4d57] dark:hover:bg-[#3b3d49] dark:text-white dark:border-[#4a4d57]"
              >
                ثبت بازخورد
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1 dark:bg-[#3b3d49] dark:border-[#4a4d57] dark:text-white dark:hover:bg-[#4a4d57]"
                onClick={onClose}
              >
                انصراف
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import type { FC, FormEvent } from 'react';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shadCn/ui/dialog';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { Download, X } from 'lucide-react';

const ExitIntentModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent): void => {
      if (e.clientY <= 0) {
        timeoutId = setTimeout(() => {
          setIsOpen(true);
        }, 100);
      }
    };

    const handleMouseEnter = (): void => {
      clearTimeout(timeoutId);
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return (): void => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5 text-blue-600" />
            Wait! Get Your Free Job Search Checklist
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Before you go, grab our proven checklist that helped 10,000+ job
            seekers land interviews 3x faster.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Send Me The Checklist
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </form>
          <p className="text-muted-foreground text-xs">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentModal;

import React, { useState, useEffect, useRef, JSX } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@shadCn/ui/dialog';
import { Input } from '@shadCn/ui/input';
import { Button } from '@shadCn/ui/button';
import { Card, CardContent } from '@shadCn/ui/card';
import { gsap } from 'gsap';

// Mock store for user data
const useStore = (): { user: { name: string } } => ({
  user: { name: 'User' },
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const OnboardingWelcomeModal: React.FC<Props> = ({ open, onOpenChange }): JSX.Element => {
  const [sheetUrl, setSheetUrl] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const userName = useStore().user.name;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out' },
      );
    }
  }, [open]);

  useEffect(() => {
    if (headers.length > 0) {
      gsap.fromTo(
        '.header-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1 },
      );
    }
  }, [headers]);

  const handleInputFocus = (): void => {
    gsap.to('.url-input', {
      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
      duration: 1,
      yoyo: true,
      repeat: 1,
    });
  };

  const handleValidateUrl = (): void => {
    setIsValidating(true);
    // Simulate API call to validate Google Sheet URL
    setTimeout(() => {
      if (sheetUrl.includes('docs.google.com/spreadsheets')) {
        setHeaders(['company_name', 'job_title', 'hiring_manager', 'location']);
      } else {
        setHeaders([]);
      }
      setIsValidating(false);
    }, 1000);
  };

  const handleConfirm = (): void => {
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      onComplete: () => onOpenChange(false),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={modalRef} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome, {userName}!</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="text-muted-foreground text-sm">
            Let&apos;s get started by connecting your Google Sheet with job data.
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              className="url-input col-span-4"
              placeholder="Paste your public Google Sheet URL"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              onFocus={handleInputFocus}
            />
            <Button
              className="col-span-4"
              onClick={handleValidateUrl}
              disabled={isValidating || !sheetUrl}
            >
              {isValidating ? 'Validating...' : 'Validate URL'}
            </Button>
          </div>
          {headers.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 font-semibold">Detected Headers:</h3>
                <ul className="list-inside list-disc space-y-1">
                  {headers.map((header, index) => (
                    <li key={index} className="header-item text-sm">
                      {header}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4 w-full"
                  onClick={handleConfirm}
                  disabled={isValidating}
                >
                  Confirm & Continue
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingWelcomeModal;

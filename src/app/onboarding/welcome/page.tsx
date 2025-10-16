'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { Card, CardContent } from '@shadCn/ui/card';
import { gsap } from 'gsap';
import { JSX, useEffect, useRef, useState } from 'react';

const WelcomePage = (): JSX.Element => {
  const router = useRouter();
  const [sheetUrl, setSheetUrl] = useState('');
  const [headers, setHeaders] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Animate page entry
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleConnect = (): void => {
    // Simulate header detection
    setHeaders(['Job Title', 'Company', 'Location', 'Application Status']);
    
    // Animate header display
    gsap.fromTo(
      '.header-item',
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.1 }
    );
  };

  const handleContinue = (): void => {
    gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => router.push('/onboarding/email-template')
    });
  };

  return (
    <div ref={containerRef} className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to Job Seeker&apos;s Assistant</h1>
          <p className="text-muted-foreground">
            Let&apos;s get started by connecting your Google Sheet with job data
          </p>
        </div>

        <Card className="w-full">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="sheet-url" className="text-sm font-medium">
                  Google Sheet URL
                </label>
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    id="sheet-url"
                    placeholder="Paste your public Google Sheet URL"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleConnect}>Connect</Button>
                </div>
              </div>

              {headers.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Detected Headers:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {headers.map((header, index) => (
                      <div key={index} className="header-item rounded-md bg-muted/50 p-2 text-sm">
                        {header}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button 
                  onClick={handleContinue}
                  disabled={headers.length === 0}
                >
                  Continue to Email Template
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default WelcomePage
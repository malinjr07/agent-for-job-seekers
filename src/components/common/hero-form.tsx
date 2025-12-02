'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { ArrowRight } from 'lucide-react';

const HeroForm: FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (): Promise<void> => {
    setError('');
    setIsSubmitting(true);

    try {
      if (!email) {
        setError('Email is required');
        return;
      }

      if (!validateEmail(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // If we get here, email is valid
      console.log('Valid email:', email);

      // Get the redirect path from environment variables
      const redirectPath = process.env.NEXT_PUBLIC_APP_REDIRECT_PATH;
      if (redirectPath) {
        // Redirect to the specified path
        router.push(redirectPath);
      }
    } catch (err) {
      console.error('Error during form submission:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex max-w-md flex-col gap-3 sm:flex-row sm:gap-4 lg:max-w-lg xl:max-w-xl">
      <div className="flex-1 space-y-1">
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // Clear error when user starts typing
            if (error) setError('');
          }}
          placeholder="Enter your email to get instant access"
          className={`w-full text-sm sm:text-base ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-xs text-red-500 sm:text-sm">{error}</p>}
      </div>
      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="bg-blue-600 px-6 text-sm hover:bg-blue-700 disabled:opacity-70 sm:px-8 sm:text-base lg:text-lg"
      >
        {isSubmitting ? 'Redirecting...' : 'Get Started Free'}
        {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default HeroForm;

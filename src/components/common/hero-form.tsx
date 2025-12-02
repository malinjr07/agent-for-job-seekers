'use client';

import React, { FC, useState, useEffect } from 'react';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { ArrowRight } from 'lucide-react';
import { addToWaitlist } from '@services/waitlist';
import { toast } from 'sonner';

const HeroForm: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return (): void => clearTimeout(timer);
    }
  }, [cooldown]);

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

      if (cooldown > 0) {
        setError(`Please wait ${cooldown} seconds before submitting again.`);
        return;
      }

      // Check localStorage for recent submission
      const lastSubmission = localStorage.getItem('waitlist_last_submission');
      if (lastSubmission && Date.now() - parseInt(lastSubmission) < 60000) { // 1 minute
        setError('Please wait before submitting again.');
        return;
      }

      const result = await addToWaitlist(email);

      if (result.success) {
        toast.success('Successfully joined the waitlist! We\'ll notify you when we launch.');
        setEmail('');
        localStorage.setItem('waitlist_last_submission', Date.now().toString());
        setCooldown(60); // 60 second cooldown
      } else {
        setError(result.message);
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
          placeholder="Enter your email to join waitlist"
          className={`w-full text-sm sm:text-base ${error ? 'border-red-500' : ''}`}
        />
        {error && <p className="text-xs text-red-500 sm:text-sm">{error}</p>}
      </div>
      <Button
        size="lg"
        onClick={handleSubmit}
        disabled={isSubmitting || cooldown > 0}
        className="bg-blue-600 px-6 text-sm hover:bg-blue-700 disabled:opacity-70 sm:px-8 sm:text-base lg:text-lg"
      >
        {isSubmitting ? 'Joining Waitlist...' : cooldown > 0 ? `Wait ${cooldown}s` : 'Join Waitlist'}
        {!isSubmitting && cooldown === 0 && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default HeroForm;

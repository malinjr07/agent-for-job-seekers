'use client';

import { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { Card, CardContent } from '@shadCn/ui/card';
import {
  Mail,
  FileText,
  Users,
  CheckCircle,
  Target,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import PricingCalculator from '@common/pricing-calculator';
import FAQSection from '@common/faq-section';
import OnboardingPreview from '@common/onboarding-preview';
import HeroSection from '@common/hero-section';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage: NextPage = () => {
  const counterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // CTA form state
  const [ctaEmail, setCtaEmail] = useState<string>('');
  const [ctaError, setCtaError] = useState<string>('');
  const [ctaIsSubmitting, setCtaIsSubmitting] = useState<boolean>(false);
  const [ctaCooldown, setCtaCooldown] = useState<number>(0);

  useEffect(() => {
    if (ctaCooldown > 0) {
      const timer = setTimeout(() => setCtaCooldown(ctaCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [ctaCooldown]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      );

      gsap.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' },
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: 'power3.out' },
      );

      // Split screen animation
      gsap.fromTo(
        '.job-board',
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.6, ease: 'power3.out' },
      );

      gsap.fromTo(
        '.email-animation',
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.8, ease: 'power3.out' },
      );

      // Counter animation
      gsap.fromTo(
        '.counter-item',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: counterRef.current,
            start: 'top 80%',
          },
        },
      );

      // Stats animation
      gsap.fromTo(
        '.stat-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
        },
      );
    });

    return (): void => ctx.revert();
  }, []);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleCtaSubmit = async (): Promise<void> => {
    setCtaError('');
    setCtaIsSubmitting(true);

    try {
      if (!ctaEmail) {
        setCtaError('Email is required');
        return;
      }

      if (!validateEmail(ctaEmail)) {
        setCtaError('Please enter a valid email address');
        return;
      }

      if (ctaCooldown > 0) {
        setCtaError(`Please wait ${ctaCooldown} seconds before submitting again.`);
        return;
      }

      // Check localStorage for recent submission
      const lastSubmission = localStorage.getItem('cta_waitlist_last_submission');
      if (lastSubmission && Date.now() - parseInt(lastSubmission) < 60000) {
        setCtaError('Please wait before submitting again.');
        return;
      }

      const { addToWaitlist } = await import('@services/waitlist');
      const result = await addToWaitlist(ctaEmail);

      if (result.success) {
        toast.success('Successfully joined the waitlist! We\'ll notify you when we launch.');
        setCtaEmail('');
        localStorage.setItem('cta_waitlist_last_submission', Date.now().toString());
        setCtaCooldown(60);
      } else {
        setCtaError(result.message);
      }
    } catch (err) {
      console.error('Error during CTA form submission:', err);
      setCtaError('An error occurred. Please try again.');
    } finally {
      setCtaIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Social Proof Strip */}
      <div className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-muted-foreground flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>12K+ users</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>3M+ personalized emails sent</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>89% delivery rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Live Counter Demo */}
      <section
        className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"
        ref={counterRef}
      >
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Watch Applications Being Sent{' '}
            <span className="text-blue-600">Right Now</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            <div className="counter-item">
              <div className="mb-2 text-4xl font-bold text-blue-600">1,247</div>
              <div className="text-muted-foreground">
                Resumes Customized Today
              </div>
            </div>
            <div className="counter-item">
              <div className="mb-2 text-4xl font-bold text-green-600">892</div>
              <div className="text-muted-foreground">Emails Delivered</div>
            </div>
            <div className="counter-item">
              <div className="mb-2 text-4xl font-bold text-purple-600">156</div>
              <div className="text-muted-foreground">Interview Requests</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Agitation - Story Format */}
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 py-12 text-white sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              The Job Market Reality Check
            </h2>
            <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Target className="mb-4 h-8 w-8 text-red-400" />
                  <h3 className="mb-2 font-semibold">
                    The Competition Problem
                  </h3>
                  <p className="text-sm text-gray-300">
                    According to Austin Balcek&apos;s research, the job market
                    has become incredibly competitive. Generic applications get
                    lost in the noise.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <Clock className="mb-4 h-8 w-8 text-yellow-400" />
                  <h3 className="mb-2 font-semibold">The Time Trap</h3>
                  <p className="text-sm text-gray-300">
                    Customizing resumes and cover letters for each application
                    takes hours. Most job seekers give up or send generic
                    applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <TrendingUp className="mb-4 h-8 w-8 text-green-400" />
                  <h3 className="mb-2 font-semibold">The Solution</h3>
                  <p className="text-sm text-gray-300">
                    Automate the personalization process. Send 100 tailored
                    applications in the time it used to take for 5.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"
        ref={statsRef}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
              Connect your Google Sheets, create templates, and let our AI
              handle the rest
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold">Smart Resume Builder</h3>
                <p className="text-muted-foreground text-sm">
                  FlowCV-like editor with 14 customizable sections. Auto-reorder
                  skills and experience based on job requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold">Batch Email Campaigns</h3>
                <p className="text-muted-foreground text-sm">
                  Create email templates with variables from your Google Sheets.
                  Send personalized cold emails at scale.
                </p>
              </CardContent>
            </Card>

            <Card className="stat-card">
              <CardContent className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold">Analytics Dashboard</h3>
                <p className="text-muted-foreground text-sm">
                  Track delivery rates, response rates, and interview requests.
                  Optimize your campaigns for better results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <PricingCalculator />

      {/* Onboarding Flow Preview */}
      <OnboardingPreview />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 text-white sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
            Join the Waitlist for Early Access
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base opacity-90 sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
            Be among the first to access ResuMail and revolutionize your job search with AI-powered personalization
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <div className="flex-1 space-y-1">
              <Input
                type="email"
                value={ctaEmail}
                onChange={(e) => {
                  setCtaEmail(e.target.value);
                  if (ctaError) setCtaError('');
                }}
                placeholder="Enter your email"
                className="bg-white text-black"
              />
              {ctaError && <p className="text-xs text-red-300 sm:text-sm">{ctaError}</p>}
            </div>
            <Button
              size="lg"
              onClick={handleCtaSubmit}
              disabled={ctaIsSubmitting || ctaCooldown > 0}
              variant="secondary"
            >
              {ctaIsSubmitting ? 'Joining Waitlist...' : ctaCooldown > 0 ? `Wait ${ctaCooldown}s` : 'Join Waitlist'}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 font-semibold">Job Seeker Assistant</h3>
              <p className="text-sm text-gray-400">
                Automate your job search with AI-powered personalization
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Templates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Creato. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

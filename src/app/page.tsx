'use client';

import { NextPage } from 'next';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@shadCn/ui/button';
import { Input } from '@shadCn/ui/input';
import { Card, CardContent } from '@shadCn/ui/card';
import { Badge } from '@shadCn/ui/badge';
import {
  Mail,
  FileText,
  Users,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Clock,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import PricingCalculator from '@common/pricing-calculator';
import FAQSection from '@common/faq-section';
import OnboardingPreview from '@common/onboarding-preview';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage: NextPage = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
      <section
        ref={heroRef}
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16 2xl:gap-20">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="px-3 py-1">
                  <Zap className="mr-1 h-3 w-3" />
                  Stop Using Generic Resumes
                </Badge>
                <h1 className="hero-title text-3xl leading-tight font-bold sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                  Send 100 Tailored Applications in{' '}
                  <span className="text-blue-600">One Night</span>
                </h1>
                <p className="hero-subtitle text-muted-foreground max-w-lg text-lg sm:text-xl md:text-2xl lg:text-xl xl:max-w-xl xl:text-2xl">
                  Automate personalized job applications with AI-powered resume
                  customization and batch email campaigns. Land your dream job
                  faster.
                </p>
              </div>

              <div className="hero-cta space-y-4">
                <div className="flex max-w-md flex-col gap-3 sm:flex-row sm:gap-4 lg:max-w-lg xl:max-w-xl">
                  <Input
                    type="email"
                    placeholder="Enter your email to get instant access"
                    className="flex-1 text-sm sm:text-base"
                  />
                  <Button
                    size="lg"
                    className="bg-blue-600 px-6 text-sm hover:bg-blue-700 sm:px-8 sm:text-base lg:text-lg"
                  >
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">
                  No credit card required • 7-day free trial
                </p>
              </div>
            </div>

            {/* Right Side - Split Screen Animation */}
            <div className="relative">
              <div className="grid h-96 grid-cols-2 gap-4">
                {/* Job Board Side */}
                <Card className="job-board bg-white/80 p-4 backdrop-blur-sm">
                  <CardContent className="space-y-3 p-0">
                    <h3 className="text-sm font-semibold">Job Listings</h3>
                    {[
                      'Frontend Developer - Google',
                      'React Engineer - Meta',
                      'UI Developer - Apple',
                      'Web Developer - Netflix',
                    ].map((job, index) => (
                      <div
                        key={index}
                        className="rounded bg-slate-100 p-2 text-xs"
                      >
                        {job}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Email Animation Side */}
                <Card className="email-animation bg-white/80 p-4 backdrop-blur-sm">
                  <CardContent className="space-y-3 p-0">
                    <h3 className="text-sm font-semibold">
                      Personalized Emails
                    </h3>
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-blue-500" />
                        <div className="h-2 flex-1 rounded bg-blue-100">
                          <div
                            className="h-full animate-pulse rounded bg-blue-500"
                            style={{ width: '80%' }}
                          />
                        </div>
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            Ready to 10x Your Job Application Success?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base opacity-90 sm:text-lg md:text-xl lg:text-xl xl:text-2xl">
            Join thousands of job seekers who&apos;ve automated their way to
            better opportunities
          </p>
          <div className="mx-auto flex max-w-md flex-col justify-center gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-black"
            />
            <Button size="lg" variant="secondary">
              Get Started Free
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
            <p>&copy; 2024 Job Seeker Assistant. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

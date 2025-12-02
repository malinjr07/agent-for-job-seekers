import { Badge } from '@shadCn/ui/badge';
import { Card, CardContent } from '@shadCn/ui/card';
import { CheckCircle, Mail, Zap } from 'lucide-react';
import React, { FC, useRef } from 'react';
import HeroForm from './hero-form';

const HeroSection: FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  return (
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
              <HeroForm />
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
                  <h3 className="text-sm font-semibold">Personalized Emails</h3>
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
  );
};

export default HeroSection;

'use client';

import { useState, useEffect, FC, createElement } from 'react';
import { Card, CardContent } from '@shadCn/ui/card';
import { Button } from '@shadCn/ui/button';
import { Badge } from '@shadCn/ui/badge';
import { Progress } from '@shadCn/ui/progress';
import {
  FileSpreadsheet,
  Mail,
  FileText,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Play,
  Pause,
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Connect Google Sheets',
    description: 'Paste your Google Sheets URL with job listings',
    icon: FileSpreadsheet,
    details:
      'Our system automatically detects column headers like Company, Position, Email, Location, etc.',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'Create Email Template',
    description: 'Design your personalized email template',
    icon: Mail,
    details:
      'Use rich text editor with variables from your sheet headers. Preview how each email will look.',
    color: 'bg-green-500',
  },
  {
    id: 3,
    title: 'Build Your Resume',
    description: 'Customize your resume with our FlowCV-like editor',
    icon: FileText,
    details:
      '14 customizable sections, drag-and-drop reordering, and automatic skill prioritization.',
    color: 'bg-purple-500',
  },
  {
    id: 4,
    title: 'Launch & Track',
    description: 'Send applications and monitor results',
    icon: BarChart3,
    details:
      'Real-time delivery tracking, response monitoring, and detailed analytics dashboard.',
    color: 'bg-orange-500',
  },
];

const OnboardingPreview: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((current) => (current + 1) % steps.length);
          return 0;
        }
        return prev + 2;
      });
    }, 100);

    return (): void => clearInterval(interval);
  }, [isPlaying]);

  const handleStepClick = (index: number): void => {
    setCurrentStep(index);
    setProgress(0);
  };

  return (
    <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-3 py-1">
            <Play className="mr-1 h-3 w-3" />
            How It Works
          </Badge>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            From Setup to Success in{' '}
            <span className="text-blue-600">4 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
            See exactly how our platform transforms your job search workflow
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Step Navigation */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:gap-12">
            {/* Steps Sidebar */}
            <div className="lg:w-1/3">
              <div className="flex gap-2 overflow-x-auto pb-4 sm:gap-4 lg:flex-col lg:overflow-x-visible lg:pb-0">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === index;
                  const isCompleted = currentStep > index;

                  return (
                    <button
                      key={step.id}
                      onClick={(): void => handleStepClick(index)}
                      className={`flex min-w-[280px] items-center gap-3 rounded-lg p-3 text-left transition-all sm:min-w-0 sm:gap-4 sm:p-4 ${
                        isActive
                          ? 'border-2 border-blue-200 bg-white shadow-lg'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg sm:h-12 sm:w-12 ${
                          isCompleted ? 'bg-green-500' : step.color
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                        ) : (
                          <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-1 text-sm font-semibold sm:text-base">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                          {step.description}
                        </p>
                        {isActive && (
                          <Progress value={progress} className="mt-2 h-1" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2"
                >
                  {isPlaying ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <span className="text-muted-foreground text-xs sm:text-sm">
                  Auto-advancing demo
                </span>
              </div>
            </div>

            {/* Step Content */}
            <div className="lg:w-2/3">
              <Card className="h-full">
                <CardContent className="p-6 sm:p-8">
                  <div className="mb-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${steps[currentStep].color}`}
                      >
                        {createElement(steps[currentStep].icon, {
                          className: 'h-4 w-4 text-white',
                        })}
                      </div>
                      <h3 className="text-xl font-bold sm:text-2xl">
                        {steps[currentStep].title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                      {steps[currentStep].details}
                    </p>
                  </div>

                  {/* Step-specific content */}
                  <div className="flex min-h-[200px] items-center justify-center rounded-lg bg-slate-50 p-4 sm:min-h-[300px] sm:p-6">
                    {currentStep === 0 && (
                      <div className="w-full max-w-md space-y-4 text-center">
                        <div className="rounded-lg bg-green-100 p-3">
                          <FileSpreadsheet className="mx-auto mb-2 h-8 w-8 text-green-600" />
                          <p className="text-sm font-medium">
                            Google Sheets Connected
                          </p>
                        </div>
                        <div className="space-y-2 text-left">
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Company</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Position</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Email</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                          <div className="flex justify-between text-xs sm:text-sm">
                            <span>Location</span>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="w-full max-w-md space-y-4">
                        <div className="rounded border-2 border-dashed border-gray-300 bg-white p-4">
                          <p className="mb-2 text-xs text-gray-600 sm:text-sm">
                            Email Template Preview:
                          </p>
                          <div className="text-xs sm:text-sm">
                            <p>
                              Hi{' '}
                              <span className="rounded bg-blue-100 px-1">
                                {'{{Name}}'}
                              </span>
                              ,
                            </p>
                            <p className="mt-2">
                              I&apos;m interested in the{' '}
                              <span className="rounded bg-blue-100 px-1">
                                {'{{Position}}'}
                              </span>{' '}
                              role at{' '}
                              <span className="rounded bg-blue-100 px-1">
                                {'{{Company}}'}
                              </span>
                              .
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-green-600 sm:text-sm">
                          <CheckCircle className="h-4 w-4" />
                          Variables automatically populated
                        </div>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="w-full max-w-md space-y-4">
                        <div className="rounded bg-white p-4 shadow-sm">
                          <div className="mb-3 flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium">
                              Resume Builder
                            </span>
                          </div>
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded bg-blue-500"></div>
                              <span>Basic Information</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded bg-green-500"></div>
                              <span>Professional Experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded bg-purple-500"></div>
                              <span>Skills (Auto-reordered)</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded bg-orange-500"></div>
                              <span>Education</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="w-full max-w-md space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="rounded bg-white p-3 text-center">
                            <div className="text-lg font-bold text-green-600 sm:text-xl">
                              89%
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Delivered
                            </div>
                          </div>
                          <div className="rounded bg-white p-3 text-center">
                            <div className="text-lg font-bold text-blue-600 sm:text-xl">
                              23%
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Opened
                            </div>
                          </div>
                          <div className="rounded bg-white p-3 text-center">
                            <div className="text-lg font-bold text-purple-600 sm:text-xl">
                              12
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Responses
                            </div>
                          </div>
                          <div className="rounded bg-white p-3 text-center">
                            <div className="text-lg font-bold text-orange-600 sm:text-xl">
                              5
                            </div>
                            <div className="text-muted-foreground text-xs">
                              Interviews
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-muted-foreground text-xs sm:text-sm">
                      Step {currentStep + 1} of {steps.length}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentStep((currentStep + 1) % steps.length)
                      }
                      className="flex items-center gap-2"
                    >
                      Next Step
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Your Free Trial
          </Button>
          <p className="text-muted-foreground mt-2 text-xs sm:text-sm">
            No credit card required • Setup takes less than 5 minutes
          </p>
        </div>
      </div>
    </section>
  );
};

export default OnboardingPreview;

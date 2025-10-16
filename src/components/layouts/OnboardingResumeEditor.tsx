/* eslint-disable react-hooks/purity */
import React, { useState, useEffect, useRef, JSX } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadCn/ui/tabs';
import { Card, CardContent } from '@shadCn/ui/card';
import { Button } from '@shadCn/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@shadCn/ui/tooltip';
import { gsap } from 'gsap';

// Mock components for resume sections
const BasicInfoForm = (): JSX.Element => (
  <div className="space-y-4 rounded-md border p-4">Basic Info Form</div>
);
const AboutMeForm = (): JSX.Element => (
  <div className="space-y-4 rounded-md border p-4">About Me Form</div>
);
const ResumePreview = ({ updated }: { updated: boolean }): JSX.Element => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (updated && previewRef.current) {
      gsap.to(previewRef.current, {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        duration: 0.25,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [updated]);

  return (
    <div ref={previewRef} className="h-full rounded-md border p-4">
      Resume Live Preview
    </div>
  );
};

type Props = {
  onComplete: () => void;
};

const OnboardingResumeEditor: React.FC<Props> = ({ onComplete }) => {
  const [activeTab, setActiveTab] = useState('content');
  const [previewUpdated, setPreviewUpdated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentTabRef = useRef<HTMLDivElement>(null);
  const customizeTabRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [tourStep, setTourStep] = useState(0);
 
  const startTour = (): (() => void) => {
    setTourStep(1);
    // Simulate tour progression
    const timer1 = setTimeout(() => setTourStep(2), 3000);
    const timer2 = setTimeout(() => setTourStep(3), 6000);
    const timer3 = setTimeout(() => setTourStep(0), 9000); // End tour
    return (): void => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };
  
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
      );
    }
    startTour();
  }, []);

  useEffect(() => {
    if (contentTabRef.current && customizeTabRef.current) {
      gsap.fromTo(
        activeTab === 'content'
          ? contentTabRef.current
          : customizeTabRef.current,
        { opacity: 0, x: activeTab === 'content' ? -10 : 10 },
        { opacity: 1, x: 0, duration: 0.3 },
      );
    }
  }, [activeTab]);

  useEffect(() => {
    if (tourStep > 0) {
      gsap.fromTo(
        `.tour-step-${tourStep}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out' },
      );
    }
  }, [tourStep]);



  const handleContentChange = (): void => {
    setPreviewUpdated(true);
    setTimeout(() => setPreviewUpdated(false), 500);
  };

  const handleFinish = (): void => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        // Simulate confetti burst
        gsap.to('.confetti', {
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          yoyo: true,
          repeat: 1,
        });
        onComplete();
      },
    });
  };

  return (
    <div ref={containerRef} className="relative flex h-full flex-col p-6">
      {/* Mock confetti elements for animation */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="confetti hidden"
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            background: `hsl(${Math.random() * 360}, 100%, 50%)`,
          }}
        />
      ))}
      <h1 className="mb-6 text-2xl font-bold">Build Your Master Resume</h1>
      <div className="flex h-full flex-row gap-6">
        <div className="w-1/3">
          <Card>
            <CardContent className="p-0">
              <Tabs
                defaultValue="content"
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="customize">Customize</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="content"
                  ref={contentTabRef}
                  className="relative space-y-4 p-4"
                >
                  <TooltipProvider>
                    <Tooltip open={tourStep === 1}>
                      <TooltipTrigger asChild>
                        <div>
                          <h2 className="font-semibold">Basic Information</h2>
                          <BasicInfoForm />
                          <h2 className="mt-4 font-semibold">About Me</h2>
                          <AboutMeForm />
                          <Button
                            className="mt-4 w-full"
                            onClick={handleContentChange}
                          >
                            Add Content
                          </Button>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className={`tour-step-1 max-w-xs`}
                        side="right"
                      >
                        Add and edit your resume content here. Fill out the
                        basic sections to see the preview update.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsContent>
                <TabsContent
                  value="customize"
                  ref={customizeTabRef}
                  className="relative space-y-4 p-4"
                >
                  <TooltipProvider>
                    <Tooltip open={tourStep === 2}>
                      <TooltipTrigger asChild>
                        <div>
                          <h2 className="font-semibold">Template & Style</h2>
                          <div className="rounded-md border p-4">
                            Customization Options
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className={`tour-step-2 max-w-xs`}
                        side="right"
                      >
                        Customize the look of your resume with templates,
                        colors, and fonts.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        <div className="w-2/3" ref={previewRef}>
          <Card>
            <CardContent className="relative p-6">
              <TooltipProvider>
                <Tooltip open={tourStep === 3}>
                  <TooltipTrigger asChild>
                    <div>
                      <ResumePreview updated={previewUpdated} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent
                    className={`tour-step-3 max-w-xs`}
                    side="left"
                  >
                    See your resume update in real-time as you edit content or
                    customize styles.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button className="mt-6 w-48" onClick={handleFinish}>
        Finish Onboarding
      </Button>
    </div>
  );
};

export default OnboardingResumeEditor;

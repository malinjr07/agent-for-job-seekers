'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@shadCn/ui/button';
import { Card, CardContent } from '@shadCn/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadCn/ui/tabs';
import { gsap } from 'gsap';
import { JSX, useEffect, useRef, useState } from 'react';

const ResumePage = (): JSX.Element => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('content');
  const containerRef = useRef<HTMLDivElement>(null);
  const [resumeData, setResumeData] = useState({
    name: '',
    title: '',
    summary: '',
  });

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const handleInputChange = (field: string, value: string): void => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = (): void => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.5,
      onComplete: () => {
        localStorage.setItem('onboardingCompleted', 'true');
        router.push('/dashboard');
      }
    });
  };

  return (
    <div ref={containerRef} className="container mx-auto min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-3xl font-bold">Build Your Master Resume</h1>
          <p className="text-muted-foreground">
            Customize your resume content and design
          </p>
        </div>

        <Tabs 
          defaultValue="content" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Basic Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <input
                        type="text"
                        className="w-full rounded-md border p-2 text-sm"
                        value={resumeData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <input
                        type="text"
                        className="w-full rounded-md border p-2 text-sm"
                        value={resumeData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Senior Software Engineer"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Summary</label>
                  <textarea
                    className="w-full rounded-md border p-3 text-sm min-h-[120px]"
                    value={resumeData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="A brief summary of your professional background..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Choose a Template</h2>
                <div className="grid grid-cols-3 gap-4">
                  {['Minimal', 'Professional', 'Creative'].map((template) => (
                    <div 
                      key={template}
                      className="border rounded-md p-4 cursor-pointer hover:border-primary transition-colors"
                      onClick={() => setActiveTab('content')}
                    >
                      <div className="h-32 bg-muted/50 rounded mb-2"></div>
                      <p className="text-sm text-center">{template}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.back()}
          >
            Back
          </Button>
          <Button onClick={handleComplete}>
            Finish & Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
export default ResumePage
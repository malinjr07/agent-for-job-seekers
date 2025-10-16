'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@shadCn/ui/button';
import { Card, CardContent } from '@shadCn/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shadCn/ui/tooltip';
import { gsap } from 'gsap';
import { JSX, useEffect, useRef, useState } from 'react';

const EmailTemplatePage = (): JSX.Element => {
  const router = useRouter();
  const [template, setTemplate] = useState('');
  const [showVariables, setShowVariables] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLInputElement>(null);

  const variables = ['{{job_title}}', '{{company_name}}', '{{hiring_manager}}', '{{position}}'];

  useEffect(() => {
    // Animate page entry
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  const insertVariable = (variable: string): void => {
    const editor = editorRef.current;
    if (!editor) return;
    
    // Insert variable at cursor position
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    
    if (range) {
      range.deleteContents();
      const textNode = document.createTextNode(variable);
      range.insertNode(textNode);
      
      // Move cursor after the inserted variable
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    
    // Bounce animation for the inserted variable
    gsap.fromTo(
      editor,
      { scale: 1.02 },
      { 
        scale: 1, 
        duration: 0.3, 
        ease: 'elastic.out(1, 0.5)',
        onComplete: () => setTemplate(editor.innerText)
      }
    );
  };

  const handleContinue = (): void => {
    gsap.to(containerRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      onComplete: () => router.push('/onboarding/resume')
    });
  };

  return (
    <div ref={containerRef} className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Create Your Email Template</h1>
          <p className="text-muted-foreground">
            Customize your email template with placeholders for personalization
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-3">
            <Card>
              <CardContent className="p-6">
                <input 
                  ref={editorRef}
                  contentEditable
                  className="min-h-[300px] rounded-md border p-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onInput={(e) => setTemplate(e.currentTarget.innerText)}
                  placeholder="Write your email template here..."
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Variables</h3>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setShowVariables(!showVariables)}
                    >
                      {showVariables ? 'Hide' : 'Show'}
                    </Button>
                  </div>
                  
                  {showVariables && (
                    <div className="grid grid-cols-2 gap-2">
                      {variables.map((variable, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs"
                                onClick={() => insertVariable(variable)}
                              >
                                {variable}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                              <p>Click to insert {variable}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
              <Button onClick={handleContinue} disabled={!template.trim()}>
                Continue to Resume Builder
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
        </div>
      </div>
    </div>
  );
}
export default EmailTemplatePage
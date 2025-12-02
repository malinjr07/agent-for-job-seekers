import React, { useState, useEffect, useRef, JSX } from 'react';
import { Card, CardContent } from '@shadCn/ui/card';
import { Button } from '@shadCn/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shadCn/ui/tooltip';
import { gsap } from 'gsap';

// Mock rich text editor component
const RichTextEditor = ({ content, onChange }: { content: string; onChange: (content: string) => void }): JSX.Element => (
  <div className="h-64 border rounded-md p-4 overflow-auto" contentEditable onInput={(e) => onChange(e.currentTarget.innerHTML)}>
    {content || 'Write your email template here...'}
  </div>
);

type Props = {
  onComplete: () => void;
};

const OnboardingEmailTemplateEditor: React.FC<Props> = ({ onComplete }): JSX.Element => {
  const [templateContent, setTemplateContent] = useState('');
  const [variables, setVariables] = useState<string[]>(['company_name', 'job_title', 'hiring_manager', 'location']);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const variablesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { x: '100%' },
        { x: 0, duration: 0.7 }
      );
    }
    if (editorRef.current && variablesRef.current) {
      gsap.fromTo(
        editorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 }
      );
      gsap.fromTo(
        variablesRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, delay: 0.2 }
      );
    }
  }, []);

  const handleVariableClick = (variable: string): void => {
    gsap.to(`#var-${variable}`, {
      scale: 1.1,
      duration: 0.15,
      yoyo: true,
      repeat: 1,
    });
    setTemplateContent((prev) => prev + `{${variable}}`);
    setVariables(['company_name', 'job_title', 'hiring_manager', 'location']);
  };

  const handleContinue = (): void => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.5,
      onComplete,
    });
  };

  return (
    <div ref={containerRef} className="flex flex-col h-full p-6">
      <h1 className="text-2xl font-bold mb-6">Create Your First Email Template</h1>
      <div className="flex flex-row gap-6 h-full">
        <div className="w-2/3" ref={editorRef}>
          <Card>
            <CardContent className="p-6">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <RichTextEditor content={templateContent} onChange={setTemplateContent} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs tooltip-content">
                    Write a generic email that can be personalized with variables. Click a variable on the right to insert it.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>
        </div>
        <div className="w-1/3" ref={variablesRef}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Available Variables</h2>
              <div className="space-y-2">
                {variables.map((variable) => (
                  <Button
                    key={variable}
                    id={`var-${variable}`}
                    variant="outline"
                    className="w-full text-left justify-start"
                    onClick={() => handleVariableClick(variable)}
                  >
                    {variable}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Button className="mt-6 w-48" onClick={handleContinue} disabled={!templateContent}>
        Save & Continue
      </Button>
    </div>
  );
};

export default OnboardingEmailTemplateEditor;

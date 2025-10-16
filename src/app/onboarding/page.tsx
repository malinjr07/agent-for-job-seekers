'use client';
import React, { useState, useEffect } from 'react';
import OnboardingWelcomeModal from '@layouts/OnboardingWelcomeModal';
import OnboardingEmailTemplateEditor from '@layouts/OnboardingEmailTemplateEditor';
import OnboardingResumeEditor from '@layouts/OnboardingResumeEditor';
import { useRouter } from 'next/navigation';

const OnboardingPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    // Check if onboarding is already completed
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleNextStep = (): void => {
    setStep((prev) => prev + 1);
  };

  const handleComplete = (): void => {
    localStorage.setItem('onboardingCompleted', 'true');
    router.push('/dashboard');
  };

  return (
    <div className="bg-background min-h-screen">
      {step === 1 && (
        <OnboardingWelcomeModal
          open={true}
          onOpenChange={() => handleNextStep()}
        />
      )}
      {step === 2 && (
        <OnboardingEmailTemplateEditor onComplete={handleNextStep} />
      )}
      {step === 3 && <OnboardingResumeEditor onComplete={handleComplete} />}
    </div>
  );
};

export default OnboardingPage;

'use client';

import { FC, ReactElement, useState } from 'react';
import { Card, CardContent } from '@shadCn/ui/card';
import { Badge } from '@shadCn/ui/badge';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does the Google Sheets integration work?',
    answer:
      'Simply share your Google Sheets URL (with read access) containing job listings. Our system automatically detects all column headers and lets you map them to email variables and resume fields. You can refresh the data anytime to get the latest job postings.',
  },
  {
    question: 'Can I customize my resume for each job application?',
    answer:
      'Our FlowCV-like editor has 14 customizable sections including education, experience, skills, and more. The system automatically reorders skills and experience based on job requirements, and you can personalize the filename with timestamps, names, or sheet data.',
  },
  {
    question: "What's included in the email personalization?",
    answer:
      'Each email is personalized with recipient name, job title, company name, location, required skills, and any other data from your Google Sheets. You create the template once, and we handle all the variable substitution automatically.',
  },
  {
    question: 'How does the credit-based pricing work?',
    answer:
      'You pay $0.10 per personalized application sent. This includes custom resume generation, personalized email creation, and delivery tracking. No monthly subscriptions or hidden fees - you only pay for what you use.',
  },
  {
    question: 'What happens if an email fails to deliver?',
    answer:
      "Failed deliveries don't count against your credits. Our dashboard shows detailed delivery statistics including successful sends, failures, and bounce reasons. You can retry failed sends or update contact information as needed.",
  },
  {
    question: 'Can I schedule my email campaigns?',
    answer:
      'Yes! You can schedule batch emails to be sent at optimal times. The system converts your resume to PDF with the appropriate filename and sends personalized emails according to your schedule.',
  },
  {
    question: 'Is there a limit to how many applications I can send?',
    answer:
      'No limits! Send 10 applications or 1000+ - you only pay per application sent. Our system is designed to handle large batch campaigns efficiently.',
  },
  {
    question: 'What kind of analytics do you provide?',
    answer:
      'Our dashboard tracks emails sent, delivered, failed, opened, and clicked. You can also see response rates, interview requests, and which job types perform best. All data is exportable for your records.',
  },
  {
    question: 'Do you integrate with job boards like LinkedIn or Indeed?',
    answer:
      'Currently, we work with Google Sheets data that you can populate from any source. Many users export job listings from various boards into their sheets. Direct integrations with job boards are planned for future releases.',
  },
  {
    question: 'Is my data secure and private?',
    answer:
      'Yes, we take security seriously. All data is encrypted in transit and at rest. We only access your Google Sheets with read-only permissions, and we never store your personal information longer than necessary for processing.',
  },
];

const FAQSection: FC = (): ReactElement => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number): void => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-3 py-1">
            <HelpCircle className="mr-1 h-3 w-3" />
            FAQ
          </Badge>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-blue-600">Questions</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
            Everything you need to know about automating your job search
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-3 sm:gap-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full p-4 text-left transition-colors hover:bg-slate-50 sm:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="pr-4 text-sm font-semibold sm:text-base md:text-lg">
                        {faq.question}
                      </h3>
                      {openItems.includes(index) ? (
                        <ChevronUp className="h-4 w-4 flex-shrink-0 text-blue-600 sm:h-5 sm:w-5" />
                      ) : (
                        <ChevronDown className="text-muted-foreground h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      )}
                    </div>
                  </button>
                  {openItems.includes(index) && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6">
                      <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <p className="text-muted-foreground mb-4 text-sm sm:text-base">
            Still have questions?
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 sm:text-base">
              Contact Support
            </button>
            <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 sm:text-base">
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FAQSection;

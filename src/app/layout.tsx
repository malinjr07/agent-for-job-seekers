import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { FC, ReactElement } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'ResuMail - AI-Powered Job Application Assistant',
    template: '%s | ResuMail'
  },
  description: 'Automate your job search with ResuMail. Create personalized resumes and send tailored cold emails to multiple companies using simple spreadsheets. Smooth your job application process with AI-driven customization.',
  applicationName: 'ResuMail',
  authors: [{ name: 'Maruf & Rizu' }],
  generator: 'Maruf & Rizu',
  keywords: [
    'job seeker',
    'resume builder',
    'personalized resumes',
    'cold emails',
    'job applications',
    'Google Sheets integration',
    'automated outreach',
    'career tools',
    'AI job assistant',
    'batch emailing'
  ],
  referrer: 'origin',
  creator: 'Maruf & Rizu',
  publisher: 'Maruf & Rizu',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: 'ResuMail - AI-Powered Job Application Assistant',
    description: 'Automate personalized resume creation and cold email outreach. Connect Google Sheets to send tailored applications to multiple companies effortlessly.',
    siteName: 'ResuMail',
    images: [
      {
        url: '/og-image.png', // Placeholder; replace with actual image URL
        width: 1200,
        height: 630,
        alt: 'ResuMail - Job Application Automation Tool'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResuMail - AI-Powered Job Application Assistant',
    description: 'Streamline your job search with personalized resumes and automated cold emails using Google Sheets.',
    images: ['/og-image.png'], // Placeholder
  },
  facebook: undefined,
  pinterest: undefined,
  verification: undefined,
  appleWebApp: {
    capable: true,
    title: 'ResuMail',
    statusBarStyle: 'default'
  },
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: false
  },
  itunes: undefined,
  abstract: undefined,
  appLinks: undefined,
  archives: undefined,
  assets: undefined,
  bookmarks: undefined,
  pagination: undefined,
  category: 'Business & Productivity',
  classification: 'Job Search Tools',
  other: {
    'og:locale': 'en_US',
    'og:site_name': 'ResuMail'
  }
};

const RootLayout: FC<Readonly<{ children: React.ReactNode }>> = ({
  children,
}): ReactElement => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
};
export default RootLayout;

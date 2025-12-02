'use client';

import { FC, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shadCn/ui/card';
import { Button } from '@shadCn/ui/button';
import { Slider } from '@shadCn/ui/slider';
import { Badge } from '@shadCn/ui/badge';
import {
  Calculator,
  Clock,
  DollarSign,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const PricingCalculator: FC = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([50]);
  const [timePerApp, setTimePerApp] = useState([2]); // hours

  const costPerApp = 0.1;
  const hourlyRate = 25; // assumed hourly rate for job seeker's time

  const totalCost = applications[0] * costPerApp;
  const timeSaved = applications[0] * timePerApp[0];
  const moneySaved = timeSaved * hourlyRate;
  const netSavings = moneySaved - totalCost;

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center sm:mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-3 py-1">
            <Calculator className="mr-1 h-3 w-3" />
            ROI Calculator
          </Badge>
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Calculate Your{' '}
            <span className="text-blue-600">Time & Money Savings</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg md:text-xl">
            See how much time and money you&apos;ll save by automating your job
            applications
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Calculator Controls */}
            <Card className="order-2 lg:order-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  Customize Your Scenario
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8">
                <div>
                  <label className="mb-3 block text-sm font-medium">
                    Number of Applications per Month
                  </label>
                  <Slider
                    value={applications}
                    onValueChange={setApplications}
                    max={200}
                    min={10}
                    step={10}
                    className="mb-2"
                  />
                  <div className="text-muted-foreground flex justify-between text-xs sm:text-sm">
                    <span>10</span>
                    <span className="font-semibold text-blue-600">
                      {applications[0]} applications
                    </span>
                    <span>200</span>
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-medium">
                    Time per Manual Application (hours)
                  </label>
                  <Slider
                    value={timePerApp}
                    onValueChange={setTimePerApp}
                    max={5}
                    min={0.5}
                    step={0.5}
                    className="mb-2"
                  />
                  <div className="text-muted-foreground flex justify-between text-xs sm:text-sm">
                    <span>0.5h</span>
                    <span className="font-semibold text-blue-600">
                      {timePerApp[0]}h per app
                    </span>
                    <span>5h</span>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-50 p-4">
                  <h4 className="mb-2 text-sm font-semibold sm:text-base">
                    What&apos;s included in each application:
                  </h4>
                  <ul className="text-muted-foreground space-y-1 text-xs sm:text-sm">
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                      Custom resume generation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                      Personalized cover letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="mr-2 h-3 w-3 flex-shrink-0 text-green-500" />
                      Email delivery & tracking
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="order-1 space-y-4 sm:space-y-6 lg:order-2">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold sm:text-base">
                      Total Monthly Savings
                    </h3>
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                    ${netSavings.toLocaleString()}
                  </div>
                  <p className="mt-1 text-xs opacity-90 sm:text-sm">
                    {netSavings > 0
                      ? 'You save money!'
                      : 'Investment in your career'}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xs font-semibold sm:text-sm">
                        Time Saved
                      </h3>
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-xl font-bold text-blue-600 sm:text-2xl">
                      {timeSaved}h
                    </div>
                    <p className="text-muted-foreground text-xs">
                      ≈ {Math.round(timeSaved / 8)} work days
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xs font-semibold sm:text-sm">
                        Service Cost
                      </h3>
                      <DollarSign className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-xl font-bold text-purple-600 sm:text-2xl">
                      ${totalCost}
                    </div>
                    <p className="text-muted-foreground text-xs">
                      ${costPerApp} per application
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="mb-3 text-sm font-semibold sm:text-base">
                    Your ROI Breakdown
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Time value ({timeSaved}h × $25/h)</span>
                      <span className="font-semibold text-green-600">
                        +${moneySaved}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service cost ({applications[0]} × $0.10)</span>
                      <span className="font-semibold text-red-600">
                        -${totalCost}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Net Savings</span>
                      <span
                        className={
                          netSavings > 0 ? 'text-green-600' : 'text-blue-600'
                        }
                      >
                        ${netSavings}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  if (process.env.NEXT_PUBLIC_APP_REDIRECT_PATH) {
                    router.push(process.env.NEXT_PUBLIC_APP_REDIRECT_PATH);
                  }
                }}
                size="lg"
                className="w-full bg-blue-600 text-sm hover:bg-blue-700 sm:text-base"
              >
                Start Saving Time & Money
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PricingCalculator;

"use client"

import { FC, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@shadCn/ui/card"
import { Button } from "@shadCn/ui/button"
import { Slider } from "@shadCn/ui/slider"
import { Badge } from "@shadCn/ui/badge"
import { Calculator, Clock, DollarSign, TrendingUp, CheckCircle } from "lucide-react"

const PricingCalculator: FC = () => {
  const [applications, setApplications] = useState([50])
  const [timePerApp, setTimePerApp] = useState([2]) // hours

  const costPerApp = 0.1
  const hourlyRate = 25 // assumed hourly rate for job seeker's time

  const totalCost = applications[0] * costPerApp
  const timeSaved = applications[0] * timePerApp[0]
  const moneySaved = timeSaved * hourlyRate
  const netSavings = moneySaved - totalCost

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <Badge variant="secondary" className="mb-4 px-3 py-1">
            <Calculator className="h-3 w-3 mr-1" />
            ROI Calculator
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Calculate Your <span className="text-blue-600">Time & Money Savings</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            See how much time and money you&apos;ll save by automating your job applications
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
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
                  <label className="block text-sm font-medium mb-3">Number of Applications per Month</label>
                  <Slider
                    value={applications}
                    onValueChange={setApplications}
                    max={200}
                    min={10}
                    step={10}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>10</span>
                    <span className="font-semibold text-blue-600">{applications[0]} applications</span>
                    <span>200</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Time per Manual Application (hours)</label>
                  <Slider
                    value={timePerApp}
                    onValueChange={setTimePerApp}
                    max={5}
                    min={0.5}
                    step={0.5}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>0.5h</span>
                    <span className="font-semibold text-blue-600">{timePerApp[0]}h per app</span>
                    <span>5h</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm sm:text-base">What&apos;s included in each application:</h4>
                  <ul className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      Custom resume generation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      Personalized cover letter
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      Email delivery & tracking
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="order-1 lg:order-2 space-y-4 sm:space-y-6">
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm sm:text-base">Total Monthly Savings</h3>
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">${netSavings.toLocaleString()}</div>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">
                    {netSavings > 0 ? "You save money!" : "Investment in your career"}
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-xs sm:text-sm">Time Saved</h3>
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{timeSaved}h</div>
                    <p className="text-xs text-muted-foreground">≈ {Math.round(timeSaved / 8)} work days</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-xs sm:text-sm">Service Cost</h3>
                      <DollarSign className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">${totalCost}</div>
                    <p className="text-xs text-muted-foreground">${costPerApp} per application</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="font-semibold mb-3 text-sm sm:text-base">Your ROI Breakdown</h3>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>Time value ({timeSaved}h × $25/h)</span>
                      <span className="font-semibold text-green-600">+${moneySaved}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service cost ({applications[0]} × $0.10)</span>
                      <span className="font-semibold text-red-600">-${totalCost}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Net Savings</span>
                      <span className={netSavings > 0 ? "text-green-600" : "text-blue-600"}>${netSavings}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base">
                Start Saving Time & Money
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PricingCalculator
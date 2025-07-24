'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormStepWrapperProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  onPrevious?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
  isValid?: boolean;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

export function FormStepWrapper({
  title,
  description,
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isFirstStep = false,
  isLastStep = false,
  isValid = true,
  isSubmitting = false,
  children,
}: FormStepWrapperProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Form Content */}
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <p className="text-gray-600">{description}</p>}
        </CardHeader>
        <CardContent className="space-y-6">{children}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          disabled={isFirstStep || isSubmitting}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        {isLastStep ? (
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Profile'}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!isValid || isSubmitting}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, FileText } from 'lucide-react';
import { LocationPicker } from './LocationPicker';

interface BaseProfileFormProps {
  form: UseFormReturn<any>;
  showDescription?: boolean;
  descriptionLabel?: string;
  descriptionPlaceholder?: string;
}

export function BaseProfileForm({
  form,
  showDescription = false,
  descriptionLabel = 'Bio',
  descriptionPlaceholder = 'Tell us about yourself...',
}: BaseProfileFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-sm text-red-500">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Bio/Description */}
          <div className="space-y-2">
            <Label htmlFor={showDescription ? 'description' : 'bio'}>
              {descriptionLabel} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={showDescription ? 'description' : 'bio'}
              placeholder={descriptionPlaceholder}
              rows={4}
              {...register(showDescription ? 'description' : 'bio')}
              className={
                errors[showDescription ? 'description' : 'bio']
                  ? 'border-red-500'
                  : ''
              }
            />
            {errors[showDescription ? 'description' : 'bio'] && (
              <p className="text-sm text-red-500">
                {
                  errors[showDescription ? 'description' : 'bio']
                    ?.message as string
                }
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <LocationPicker form={form} />
    </div>
  );
}

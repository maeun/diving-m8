'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BaseProfileForm,
  SocialLinksForm,
  MediaUpload,
  MultiSelectInput,
  baseProfileSchema,
  BaseProfileFormData,
  MediaFormData,
} from './index';
import { User, Camera, Tags } from 'lucide-react';

// Example form data type
interface ExampleFormData extends BaseProfileFormData {
  specialties: string[];
  languages: string[];
}

// Extended schema for the example
const exampleSchema = baseProfileSchema.extend({
  specialties: z.array(z.string()),
  languages: z.array(z.string()),
});

export function ProfileFormExample() {
  const form = useForm<ExampleFormData>({
    resolver: zodResolver(exampleSchema),
    defaultValues: {
      name: '',
      bio: '',
      address: '',
      location: {
        latitude: 0,
        longitude: 0,
      },
      socialLinks: {
        instagram: '',
        facebook: '',
        youtube: '',
        website: '',
      },
      gallery: [],
      specialties: [],
      languages: [],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const gallery = watch('gallery');

  const onSubmit = async (data: ExampleFormData) => {
    console.log('Form submitted:', data);
    // Here you would typically save to Firebase
    alert('Profile saved successfully!');
  };

  const handleMediaChange = (media: MediaFormData[]) => {
    setValue('gallery', media);
  };

  const divingSpecialties = [
    'Open Water',
    'Advanced Open Water',
    'Rescue Diver',
    'Divemaster',
    'Instructor',
    'Deep Diving',
    'Wreck Diving',
    'Night Diving',
    'Underwater Photography',
    'Nitrox',
    'Technical Diving',
    'Cave Diving',
  ];

  const languages = [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Japanese',
    'Korean',
    'Mandarin',
    'Thai',
    'Indonesian',
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Form Example</CardTitle>
          <p className="text-gray-600">
            This demonstrates the base profile components working together
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Profile Information */}
        <BaseProfileForm form={form} />

        {/* Specialties */}
        <MultiSelectInput
          form={form}
          fieldName="specialties"
          label="Diving Specialties"
          description="Select your diving specialties and certifications"
          placeholder="Type or select specialties..."
          suggestions={divingSpecialties}
          maxItems={8}
          icon={Tags}
          required
        />

        {/* Languages */}
        <MultiSelectInput
          form={form}
          fieldName="languages"
          label="Languages"
          description="Languages you can communicate in"
          placeholder="Type or select languages..."
          suggestions={languages}
          maxItems={5}
          icon={User}
          required
        />

        {/* Social Media Links */}
        <SocialLinksForm form={form} />

        {/* Media Gallery */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Photo & Video Gallery
            </CardTitle>
            <p className="text-sm text-gray-600">
              Upload photos and videos to showcase your work
            </p>
          </CardHeader>
          <CardContent>
            <MediaUpload
              media={gallery}
              onChange={handleMediaChange}
              maxItems={10}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting} className="min-w-32">
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <Card>
          <CardHeader>
            <CardTitle>Debug Info</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(watch(), null, 2)}
            </pre>
            {Object.keys(errors).length > 0 && (
              <div className="mt-4">
                <h4 className="font-medium text-red-600">Validation Errors:</h4>
                <pre className="text-xs bg-red-50 p-4 rounded overflow-auto mt-2">
                  {JSON.stringify(errors, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Twitter,
  Music,
} from 'lucide-react';
import { SocialLinksFormData } from '@/lib/validations';

interface SocialLinksFormProps {
  form: UseFormReturn<any>;
  fieldPrefix?: string;
}

export function SocialLinksForm({
  form,
  fieldPrefix = 'socialLinks',
}: SocialLinksFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  const getFieldName = (field: string) => `${fieldPrefix}.${field}` as const;
  const getError = (field: string) => {
    const fieldPath = getFieldName(field).split('.');
    let error = errors;
    for (const path of fieldPath) {
      error = error?.[path];
    }
    return error?.message as string | undefined;
  };

  const socialPlatforms = [
    {
      name: 'instagram',
      label: 'Instagram',
      icon: Instagram,
      placeholder: 'https://instagram.com/yourusername',
    },
    {
      name: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      placeholder: 'https://facebook.com/yourpage',
    },
    {
      name: 'youtube',
      label: 'YouTube',
      icon: Youtube,
      placeholder: 'https://youtube.com/yourchannel',
    },
    {
      name: 'website',
      label: 'Website',
      icon: Globe,
      placeholder: 'https://yourwebsite.com',
    },
    {
      name: 'twitter',
      label: 'X (Twitter)',
      icon: Twitter,
      placeholder: 'https://twitter.com/yourusername',
    },
    {
      name: 'tiktok',
      label: 'TikTok',
      icon: Music,
      placeholder: 'https://tiktok.com/@yourusername',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Social Media Links
        </CardTitle>
        <p className="text-sm text-gray-600">
          Add your social media profiles to help customers connect with you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {socialPlatforms.map((platform) => {
          const Icon = platform.icon;
          const fieldName = getFieldName(platform.name);
          const error = getError(platform.name);

          return (
            <div key={platform.name} className="space-y-2">
              <Label htmlFor={fieldName} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {platform.label}
              </Label>
              <Input
                id={fieldName}
                type="url"
                placeholder={platform.placeholder}
                {...register(fieldName)}
                className={error ? 'border-red-500' : ''}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

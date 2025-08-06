'use client';

import React from 'react';
import { User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DefaultAvatarProps {
  name: string;
  type?: 'instructor' | 'user';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  imageUrl?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export function DefaultAvatar({
  type = 'user',
  name,
  size = 'md',
  imageUrl,
  className,
}: DefaultAvatarProps) {
  // Generate initials from name
  const getInitials = (name?: string) => {
    if (!name) return type === 'instructor' ? 'IN' : 'RE';

    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);
  const Icon = type === 'instructor' ? User : Building2;

  const colorScheme =
    type === 'instructor'
      ? 'bg-blue-100 text-blue-700 border-blue-200'
      : 'bg-green-100 text-green-700 border-green-200';

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg border-2 overflow-hidden flex-shrink-0',
        sizeClasses[size],
        colorScheme,
        className
      )}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={`${name || '사용자'}의 프로필 이미지`}
          className="w-full h-full object-cover"
        />
      ) : name ? (
        <span
          className={cn(
            'font-semibold',
            size === 'sm'
              ? 'text-xs'
              : size === 'md'
              ? 'text-sm'
              : size === 'lg'
              ? 'text-lg'
              : 'text-xl'
          )}
        >
          {initials}
        </span>
      ) : (
        <Icon className={iconSizeClasses[size]} />
      )}
    </div>
  );
}

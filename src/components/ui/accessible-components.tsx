'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Eye, MapPin, Calendar, Shield, Clock, X } from 'lucide-react';
import Link from 'next/link';

// Accessible Button Component
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export function AccessibleButton({
  variant = 'default',
  size = 'default',
  loading = false,
  loadingText = '처리 중',
  children,
  disabled,
  'aria-label': ariaLabel,
  ...props
}: AccessibleButtonProps) {
  const isDisabled = disabled || loading;
  
  return (
    <Button
      variant={variant}
      size={size}
      disabled={isDisabled}
      aria-label={loading ? loadingText : ariaLabel}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="animate-spin mr-2" aria-hidden="true">⟳</span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
}

// Accessible Card Component
interface AccessibleCardProps {
  children: React.ReactNode;
  className?: string;
  clickable?: boolean;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  ariaDescription?: string;
}

export function AccessibleCard({
  children,
  className = '',
  clickable = false,
  href,
  onClick,
  ariaLabel,
  ariaDescription,
}: AccessibleCardProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (clickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      if (href) {
        window.location.href = href;
      } else if (onClick) {
        onClick();
      }
    }
  };

  const cardProps = {
    className: `${className} ${clickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2' : ''}`,
    ...(clickable && {
      tabIndex: 0,
      role: href ? 'link' : 'button',
      onKeyDown: handleKeyDown,
      onClick: onClick,
      'aria-label': ariaLabel,
      'aria-describedby': ariaDescription ? 'description' : undefined,
    }),
  };

  const CardComponent = (
    <Card {...cardProps}>
      {children}
      {ariaDescription && (
        <div id="description" className="sr-only">
          {ariaDescription}
        </div>
      )}
    </Card>
  );

  if (href && !onClick) {
    return (
      <Link href={href} className="block">
        {CardComponent}
      </Link>
    );
  }

  return CardComponent;
}

// Accessible Badge with semantic meaning
interface AccessibleBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'default' | 'sm';
  semantic?: 'status' | 'category' | 'count' | 'rating';
  className?: string;
}

export function AccessibleBadge({
  children,
  variant = 'default',
  size = 'default',
  semantic = 'category',
  className = '',
}: AccessibleBadgeProps) {
  const getAriaLabel = () => {
    switch (semantic) {
      case 'status':
        return `상태: ${children}`;
      case 'count':
        return `개수: ${children}`;
      case 'rating':
        return `평점: ${children}`;
      default:
        return `카테고리: ${children}`;
    }
  };

  return (
    <Badge
      variant={variant as any}
      className={className}
      role="status"
      aria-label={getAriaLabel()}
    >
      {children}
    </Badge>
  );
}

// Skip to Content Link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-brand-primary text-white px-4 py-2 rounded-md focus:outline-none"
    >
      본문으로 바로가기
    </a>
  );
}

// Accessible Form Field
interface AccessibleFormFieldProps {
  label: string;
  id: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactElement;
}

export function AccessibleFormField({
  label,
  id,
  error,
  hint,
  required = false,
  children,
}: AccessibleFormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="필수">*</span>
        )}
      </label>
      
      {hint && (
        <p id={hintId} className="text-sm text-gray-600">
          {hint}
        </p>
      )}
      
      {React.cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? 'true' : 'false',
        'aria-required': required,
      })}
      
      {error && (
        <p id={errorId} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Accessible Rating Display
interface AccessibleRatingProps {
  rating: number;
  maxRating?: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function AccessibleRating({
  rating,
  maxRating = 5,
  reviewCount,
  size = 'md',
  showText = true,
}: AccessibleRatingProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const ariaLabel = `평점 ${rating}점 (최대 ${maxRating}점)${reviewCount ? `, ${reviewCount}개 리뷰` : ''}`;

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={ariaLabel}
      >
        {Array.from({ length: maxRating }, (_, index) => {
          const filled = index < Math.floor(rating);
          const partialFill = index === Math.floor(rating) && rating % 1 > 0;
          
          return (
            <Star
              key={index}
              className={`${sizeClasses[size]} ${
                filled || partialFill
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>
      
      {showText && (
        <span className="text-sm font-medium">
          {rating.toFixed(1)}
          {reviewCount && (
            <span className="text-gray-500 ml-1">
              ({reviewCount.toLocaleString()})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

// Accessible Status Indicator
interface AccessibleStatusProps {
  status: 'verified' | 'pending' | 'rejected';
  text?: string;
  showIcon?: boolean;
}

export function AccessibleStatus({
  status,
  text,
  showIcon = true,
}: AccessibleStatusProps) {
  const statusConfig = {
    verified: {
      icon: Shield,
      color: 'bg-green-100 text-green-800',
      text: text || '인증완료',
      ariaLabel: '인증된 사용자',
    },
    pending: {
      icon: Clock,
      color: 'bg-yellow-100 text-yellow-800',
      text: text || '검토중',
      ariaLabel: '인증 검토중',
    },
    rejected: {
      icon: X,
      color: 'bg-red-100 text-red-800',
      text: text || '인증실패',
      ariaLabel: '인증 실패',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge
      className={config.color}
      role="status"
      aria-label={config.ariaLabel}
    >
      {showIcon && <Icon className="w-3 h-3 mr-1" aria-hidden="true" />}
      {config.text}
    </Badge>
  );
}

// Accessible Progress Bar
interface AccessibleProgressProps {
  current: number;
  total: number;
  label: string;
  showPercentage?: boolean;
}

export function AccessibleProgress({
  current,
  total,
  label,
  showPercentage = true,
}: AccessibleProgressProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        {showPercentage && (
          <span className="text-sm text-gray-500">{percentage}%</span>
        )}
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-brand-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${label}: ${current}/${total} (${percentage}%)`}
        />
      </div>
      
      <span className="sr-only">
        {label}: {percentage}% 완료 ({current}/{total})
      </span>
    </div>
  );
}
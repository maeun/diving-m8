'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, RefreshCw, AlertCircle, Wifi, WifiOff } from 'lucide-react';

// Generic Loading Spinner
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`} role="status" aria-live="polite">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-brand-primary`} aria-hidden="true" />
      {text && <span className="text-sm text-gray-600">{text}</span>}
      <span className="sr-only">{text || '로딩 중'}</span>
    </div>
  );
}

// Inline Loading State (for buttons, etc.)
interface InlineLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
}

export function InlineLoading({ loading, children, loadingText, className = '' }: InlineLoadingProps) {
  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        <span>{loadingText || '처리 중...'}</span>
      </div>
    );
  }
  
  return <>{children}</>;
}

// Full Page Loading
export function FullPageLoading({ text = '페이지를 불러오는 중입니다...' }: { text?: string }) {
  return (
    <div 
      className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto">
          <Loader2 className="w-12 h-12 animate-spin text-brand-primary" aria-hidden="true" />
        </div>
        <p className="text-lg font-medium text-gray-900">{text}</p>
        <p className="text-sm text-gray-500">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ 
  icon: Icon = AlertCircle, 
  title, 
  description, 
  action, 
  className = '' 
}: EmptyStateProps) {
  return (
    <Card className={`text-center py-12 ${className}`}>
      <CardContent>
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <Icon className="w-8 h-8 text-gray-400" aria-hidden="true" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
              <p className="text-gray-600 max-w-md mx-auto">{description}</p>
            )}
          </div>
          
          {action && (
            <Button onClick={action.onClick} className="mt-4">
              {action.label}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Error State Component
interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
  type?: 'error' | 'offline' | 'not-found';
}

export function ErrorState({ 
  title,
  description,
  onRetry,
  retryText = '다시 시도',
  className = '',
  type = 'error'
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'offline':
        return {
          icon: WifiOff,
          defaultTitle: '인터넷 연결을 확인해주세요',
          defaultDescription: '네트워크 연결이 불안정합니다. 연결을 확인한 후 다시 시도해주세요.',
          iconColor: 'text-orange-500',
          bgColor: 'bg-orange-100'
        };
      case 'not-found':
        return {
          icon: AlertCircle,
          defaultTitle: '페이지를 찾을 수 없습니다',
          defaultDescription: '요청하신 페이지가 존재하지 않습니다.',
          iconColor: 'text-gray-500',
          bgColor: 'bg-gray-100'
        };
      default:
        return {
          icon: AlertCircle,
          defaultTitle: '문제가 발생했습니다',
          defaultDescription: '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
          iconColor: 'text-red-500',
          bgColor: 'bg-red-100'
        };
    }
  };

  const config = getErrorConfig();
  const Icon = config.icon;

  return (
    <Card className={`text-center py-12 ${className}`}>
      <CardContent>
        <div className="space-y-6">
          <div className={`w-16 h-16 mx-auto ${config.bgColor} rounded-full flex items-center justify-center`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} aria-hidden="true" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {title || config.defaultTitle}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {description || config.defaultDescription}
            </p>
          </div>
          
          {onRetry && (
            <Button 
              onClick={onRetry} 
              variant="outline"
              className="inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              {retryText}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Connection Status Indicator
export function ConnectionStatus() {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Set initial status
    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div 
      className="fixed top-16 left-0 right-0 bg-red-500 text-white px-4 py-2 text-center text-sm z-50"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="w-4 h-4" aria-hidden="true" />
        <span>인터넷 연결이 끊어졌습니다</span>
      </div>
    </div>
  );
}

// Progress Indicator
interface ProgressProps {
  current: number;
  total: number;
  text?: string;
  className?: string;
}

export function ProgressIndicator({ current, total, text, className = '' }: ProgressProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={`space-y-2 ${className}`} role="progressbar" aria-valuenow={current} aria-valuemax={total}>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{text}</span>
        <span className="font-medium">{current}/{total}</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-brand-primary h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          aria-hidden="true"
        />
      </div>
      
      <span className="sr-only">{percentage}% 완료</span>
    </div>
  );
}

// Delayed Loading (shows after a delay to avoid flicker)
interface DelayedLoadingProps {
  delay?: number;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function DelayedLoading({ delay = 200, children, fallback }: DelayedLoadingProps) {
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showLoading) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
}
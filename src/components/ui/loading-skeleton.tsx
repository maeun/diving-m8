'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Generic Loading Skeleton Component
interface LoadingSkeletonProps {
  className?: string;
  'aria-label'?: string;
}

export function LoadingSkeleton({ className = '', 'aria-label': ariaLabel }: LoadingSkeletonProps) {
  return (
    <div 
      className={`animate-pulse ${className}`}
      role="status" 
      aria-label={ariaLabel || "로딩 중"}
      aria-live="polite"
    >
      <span className="sr-only">로딩 중...</span>
    </div>
  );
}

// Instructor Card Skeleton
export function InstructorCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-4" role="status" aria-label="강사 정보 로딩 중">
          {/* Profile Image Skeleton */}
          <Skeleton className="w-16 h-16 rounded-full flex-shrink-0" />
          
          {/* Content Skeleton */}
          <div className="flex-1 space-y-3">
            {/* Name and location */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            
            {/* Experience badge */}
            <Skeleton className="h-6 w-20 rounded-md" />
            
            {/* Bio */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
            
            {/* Specialties */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>
            
            {/* Stats and price */}
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
          
          {/* Heart button */}
          <Skeleton className="w-8 h-8 rounded flex-shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

// Resort Card Skeleton
export function ResortCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {/* Image skeleton */}
        <Skeleton className="w-full h-48" />
        
        <div className="p-6 space-y-4" role="status" aria-label="리조트 정보 로딩 중">
          {/* Title and location */}
          <div className="space-y-2">
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Tags */}
          <div className="flex gap-2">
            <Skeleton className="h-6 w-12 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
          
          {/* Price and rating */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Search Results Grid Skeleton
export function SearchResultsSkeleton({ count = 6, type = 'instructor' }: { count?: number; type?: 'instructor' | 'resort' }) {
  const SkeletonComponent = type === 'instructor' ? InstructorCardSkeleton : ResortCardSkeleton;
  
  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      aria-label={`${type === 'instructor' ? '강사' : '리조트'} 검색 결과 로딩 중`}
    >
      {Array.from({ length: count }, (_, index) => (
        <SkeletonComponent key={index} />
      ))}
    </div>
  );
}

// Profile Header Skeleton
export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4" role="status" aria-label="프로필 헤더 로딩 중">
      <div className="flex items-center gap-4">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="w-24 h-10 rounded" />
      </div>
      
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
}

// List Item Skeleton (for simple lists)
export function ListItemSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3" role="status" aria-label="목록 항목 로딩 중">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="w-8 h-8" />
    </div>
  );
}

// Table Row Skeleton
export function TableRowSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <tr role="status" aria-label="테이블 행 로딩 중">
      {Array.from({ length: columns }, (_, index) => (
        <td key={index} className="px-6 py-4">
          <Skeleton className="h-4 w-full" />
        </td>
      ))}
    </tr>
  );
}

// Form Skeleton
export function FormSkeleton({ fields = 4 }: { fields?: number }) {
  return (
    <div className="space-y-6" role="status" aria-label="폼 로딩 중">
      {Array.from({ length: fields }, (_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
      ))}
      <Skeleton className="h-10 w-32 rounded" />
    </div>
  );
}

// Page Loading Skeleton (full page loader)
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse" role="status" aria-label="페이지 로딩 중">
      <div className="section-container section-padding">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <SearchResultsSkeleton count={9} />
          </div>
        </div>
      </div>
      
      <span className="sr-only">페이지를 불러오는 중입니다...</span>
    </div>
  );
}
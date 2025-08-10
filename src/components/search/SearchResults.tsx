'use client';

import React from 'react';
import Link from 'next/link';
import { InstructorCard } from './InstructorCard';
import { ResortCard } from './ResortCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchResultsSkeleton } from '@/components/ui/loading-skeleton';
import { EmptyState, ErrorState } from '@/components/ui/loading-states';
import { Grid3X3, List, SortAsc, Search, Filter } from 'lucide-react';
import { InstructorProfile, ResortProfile } from '@/types';
import { SearchFiltersState } from './SearchFilters';

interface SearchResultsProps {
  type: 'instructor' | 'resort';
  results: (InstructorProfile | ResortProfile)[];
  loading: boolean;
  error?: string | null;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onSave: (id: string) => void;
  savedItems: string[];
  filters?: SearchFiltersState;
  onFiltersChange?: (filters: SearchFiltersState) => void;
  onRetry?: () => void;
  query?: string;
}

export function SearchResults({
  type,
  results,
  loading,
  error,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onSave,
  savedItems,
  filters,
  onFiltersChange,
  onRetry,
  query,
}: SearchResultsProps) {
  const sortOptions = [
    { value: 'views', label: '조회수순' },
    { value: 'name', label: '이름순' },
    ...(type === 'instructor'
      ? [{ value: 'experience', label: '경력순' }]
      : []),
  ];

  // Handle loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {/* Header skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-9 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        
        {/* Results skeleton */}
        <SearchResultsSkeleton count={9} type={type} />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <ErrorState
        title="검색 중 문제가 발생했습니다"
        description={error}
        onRetry={onRetry}
        retryText="다시 검색"
      />
    );
  }

  // Handle empty results
  if (!loading && results.length === 0) {
    const isFiltered = filters && Object.values(filters).some(value => 
      value && (typeof value === 'string' ? value.length > 0 : 
      Array.isArray(value) ? value.length > 0 : 
      typeof value === 'object' ? Object.values(value).some(v => v !== undefined) : false)
    );

    return (
      <EmptyState
        icon={Search}
        title={isFiltered ? "검색 결과가 없습니다" : `등록된 ${type === 'instructor' ? '강사' : '리조트'}가 없습니다`}
        description={isFiltered 
          ? "검색 조건을 조정해보세요. 다른 지역이나 조건으로 다시 검색해보시기 바랍니다."
          : `아직 등록된 ${type === 'instructor' ? '강사' : '리조트'}가 없습니다. 나중에 다시 확인해주세요.`
        }
        action={isFiltered ? {
          label: "필터 초기화",
          onClick: () => onFiltersChange?.({
            location: '',
            priceRange: [0, 1000000],
            specialties: [],
            experience: '',
            rating: 0
          })
        } : undefined}
      />
    );
  }

  return (
    <div className="space-y-6" role="region" aria-label="검색 결과">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {type === 'instructor' ? '강사' : '리조트'} 검색결과
            {query && <span className="text-brand-primary ml-1">"{query}"</span>}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            총 {results.length.toLocaleString()}개 결과
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border border-gray-300 rounded-md" role="group" aria-label="보기 모드 선택">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none border-r-0"
              aria-label="그리드 보기"
              aria-pressed={viewMode === 'grid'}
            >
              <Grid3X3 className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
              aria-label="목록 보기"
              aria-pressed={viewMode === 'list'}
            >
              <List className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              aria-label="정렬 기준 선택"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <SortAsc className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          : "space-y-4"
      }>
        {results.map((item) => {
          const isInstructor = 'experience' in item;
          const isSaved = savedItems.includes(item.id);

          if (isInstructor && type === 'instructor') {
            return (
              <InstructorCard
                key={item.id}
                instructor={item as InstructorProfile}
                onSave={onSave}
                isSaved={isSaved}
              />
            );
          } else if (!isInstructor && type === 'resort') {
            return (
              <ResortCard
                key={item.id}
                resort={item as ResortProfile}
                onSave={onSave}
                isSaved={isSaved}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

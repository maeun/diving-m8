'use client';

import React from 'react';
import { InstructorCard } from './InstructorCard';
import { ResortCard } from './ResortCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Grid3X3, List, SortAsc, Search } from 'lucide-react';
import { InstructorProfile, ResortProfile } from '@/types';

interface SearchResultsProps {
  type: 'instructor' | 'resort';
  results: (InstructorProfile | ResortProfile)[];
  loading: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onSave: (id: string) => void;
  savedItems: string[];
}

export function SearchResults({
  type,
  results,
  loading,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  onSave,
  savedItems,
}: SearchResultsProps) {
  const sortOptions = [
    { value: 'views', label: '조회수순' },
    { value: 'name', label: '이름순' },
    ...(type === 'instructor'
      ? [{ value: 'experience', label: '경력순' }]
      : []),
  ];

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse border-blue-100">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-24 h-24 bg-blue-100 rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-blue-100 rounded w-1/3"></div>
                  <div className="h-3 bg-blue-100 rounded w-1/2"></div>
                  <div className="h-3 bg-blue-100 rounded w-full"></div>
                  <div className="h-3 bg-blue-100 rounded w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Search className="h-12 w-12 text-blue-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {type === 'instructor' ? '강사를' : '리조트를'} 찾을 수 없습니다
          </h3>
          <p className="text-gray-600">
            검색 조건이나 필터를 조정해서 원하는 결과를 찾아보세요.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-full text-sm ${
                type === 'instructor'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {results.length}
            </span>{' '}
            {type === 'instructor' ? '강사' : '리조트'} 발견
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex border border-blue-200 rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-200"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border-blue-200"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
            : 'space-y-4'
        }
      >
        {results.map((item) =>
          type === 'instructor' ? (
            <InstructorCard
              key={item.id}
              instructor={item as InstructorProfile}
              onSave={onSave}
              isSaved={savedItems.includes(item.id)}
            />
          ) : (
            <ResortCard
              key={item.id}
              resort={item as ResortProfile}
              onSave={onSave}
              isSaved={savedItems.includes(item.id)}
            />
          )
        )}
      </div>
    </div>
  );
}

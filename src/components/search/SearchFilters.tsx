'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, X, Filter } from 'lucide-react';

export interface SearchFiltersState {
  query: string;
  location: string;
  specialties: string[];
  priceRange: [number, number];
}

interface SearchFiltersProps {
  filters: SearchFiltersState;
  onFiltersChange: (filters: SearchFiltersState) => void;
  type: 'instructor' | 'resort';
}

const instructorSpecialties = [
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

const resortFacilities = [
  'PADI Dive Center',
  'Equipment Rental',
  'Nitrox Station',
  'Underwater Photography',
  'Spa & Wellness',
  'Infinity Pool',
  'Beach Bar',
  'WiFi',
  'Airport Transfer',
  'All Inclusive',
];

export function SearchFilters({
  filters,
  onFiltersChange,
  type,
}: SearchFiltersProps) {
  const updateFilters = (updates: Partial<SearchFiltersState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter((s) => s !== specialty)
      : [...filters.specialties, specialty];
    updateFilters({ specialties: newSpecialties });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      location: '',
      specialties: [],
      priceRange: [0, 5000],
    });
  };

  const availableOptions =
    type === 'instructor' ? instructorSpecialties : resortFacilities;
  const optionLabel = type === 'instructor' ? '전문 분야' : '시설';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          검색 필터
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="search">검색</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder={
                type === 'instructor' ? '강사 검색...' : '리조트 검색...'
              }
              value={filters.query}
              onChange={(e) => updateFilters({ query: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">지역</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              placeholder="지역을 입력하세요..."
              value={filters.location}
              onChange={(e) => updateFilters({ location: e.target.value })}
              className="pl-10"
            />
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <Label>가격대 (USD)</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="최소"
              value={filters.priceRange[0]}
              onChange={(e) =>
                updateFilters({
                  priceRange: [
                    parseInt(e.target.value) || 0,
                    filters.priceRange[1],
                  ],
                })
              }
              className="w-20"
            />
            <span>-</span>
            <Input
              type="number"
              placeholder="최대"
              value={filters.priceRange[1]}
              onChange={(e) =>
                updateFilters({
                  priceRange: [
                    filters.priceRange[0],
                    parseInt(e.target.value) || 5000,
                  ],
                })
              }
              className="w-20"
            />
          </div>
        </div>

        {/* Specialties/Facilities */}
        <div className="space-y-2">
          <Label>{optionLabel}</Label>
          <div className="flex flex-wrap gap-2">
            {availableOptions.map((option) => (
              <Badge
                key={option}
                variant={
                  filters.specialties.includes(option) ? 'default' : 'outline'
                }
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => toggleSpecialty(option)}
              >
                {option}
                {filters.specialties.includes(option) && (
                  <X className="h-3 w-3 ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={clearFilters}
          className="w-full hover:bg-gray-100"
        >
          모든 필터 초기화
        </Button>
      </CardContent>
    </Card>
  );
}

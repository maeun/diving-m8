'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  SearchFilters,
  SearchFiltersState,
} from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { Button } from '@/components/ui/button';
import { InstructorProfile, ResortProfile } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { Search, ChevronDown } from 'lucide-react';

// Import mock data (in real app, this would be a shared service)
const mockInstructors: InstructorProfile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Sarah Johnson',
    bio: 'Passionate diving instructor with over 8 years of experience teaching divers of all levels.',
    location: { latitude: 37.7749, longitude: -122.4194 },
    address: 'Monterey Bay, California, USA',
    certifications: [
      {
        name: 'Open Water Scuba Instructor',
        organization: 'PADI',
        level: 'OWSI',
        issueDate: Timestamp.fromDate(new Date('2016-03-15')),
      },
    ],
    experience: 8,
    specialties: ['Underwater Photography', 'Night Diving', 'Deep Diving'],
    languages: ['English', 'Spanish', 'French'],
    services: [
      {
        name: 'Open Water Certification',
        description: 'Complete PADI Open Water certification course',
        price: 450,
        currency: 'USD',
        duration: '3-4 days',
        maxParticipants: 4,
      },
    ],
    gallery: [],
    socialLinks: {},
    stats: { views: 1250, saves: 89, inquiries: 23 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
];

const mockResorts: ResortProfile[] = [
  {
    id: '1',
    userId: 'resort1',
    name: 'Paradise Diving Resort',
    description:
      'Experience world-class diving at our luxury resort located in the heart of the Maldives.',
    location: { latitude: 4.1755, longitude: 73.5093 },
    address: 'North Malé Atoll, Maldives',
    facilities: ['PADI Dive Center', 'Equipment Rental', 'Nitrox Station'],
    services: [
      {
        name: 'Equipment Rental',
        description: 'Full range of diving equipment',
        isIncluded: false,
      },
    ],
    packages: [
      {
        name: 'Beginner Package',
        description: 'Perfect for new divers',
        price: 1200,
        currency: 'USD',
        duration: '5 days',
        inclusions: ['Accommodation'],
        exclusions: ['Flights'],
      },
    ],
    gallery: [],
    socialLinks: {},
    stats: { views: 3420, saves: 156, inquiries: 67 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
  },
];

export default function SearchPage() {
  const [searchType, setSearchType] = useState<'instructor' | 'resort'>(
    'instructor'
  );
  const [filters, setFilters] = useState<SearchFiltersState>({
    query: '',
    location: '',
    specialties: [],
    priceRange: [0, 5000],
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('views');
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Reset filters when switching search type
  useEffect(() => {
    setFilters({
      query: '',
      location: '',
      specialties: [],
      priceRange: [0, 5000],
    });
  }, [searchType]);

  // Get current data based on search type
  const currentData =
    searchType === 'instructor' ? mockInstructors : mockResorts;

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...currentData];

    // Apply filters
    if (filters.query) {
      results = results.filter(
        (item) =>
          item.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          ('bio' in item ? item.bio : item.description)
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          item.address.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter((item) =>
        item.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.specialties.length > 0) {
      results = results.filter((item) => {
        if (searchType === 'instructor') {
          const instructor = item as InstructorProfile;
          return filters.specialties.some((specialty) =>
            instructor.specialties.includes(specialty)
          );
        } else {
          const resort = item as ResortProfile;
          return filters.specialties.some((facility) =>
            resort.facilities.some((f) =>
              f.toLowerCase().includes(facility.toLowerCase())
            )
          );
        }
      });
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) {
      results = results.filter((item) => {
        const minPrice =
          searchType === 'instructor'
            ? Math.min(
                ...(item as InstructorProfile).services.map((s) => s.price)
              )
            : Math.min(...(item as ResortProfile).packages.map((p) => p.price));
        return (
          minPrice >= filters.priceRange[0] && minPrice <= filters.priceRange[1]
        );
      });
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.stats.views - a.stats.views;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          if (searchType === 'instructor') {
            return (
              (b as InstructorProfile).experience -
              (a as InstructorProfile).experience
            );
          }
          return 0;
        default:
          return 0;
      }
    });

    return results;
  }, [filters, sortBy, currentData, searchType]);

  const handleSave = (itemId: string) => {
    setSavedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            다이빙 전문가 & 리조트 검색
          </h1>
          <p className="text-gray-600">
            다음 수중 모험을 위한 완벽한 다이빙 강사나 리조트를 찾아보세요
          </p>
        </div>

        {/* Search Type Toggle */}
        <div className="mb-8">
          <div className="flex border border-gray-300 rounded-lg p-1 w-fit">
            <Button
              variant={searchType === 'instructor' ? 'default' : 'ghost'}
              onClick={() => setSearchType('instructor')}
              className="rounded-r-none"
            >
              강사
            </Button>
            <Button
              variant={searchType === 'resort' ? 'default' : 'ghost'}
              onClick={() => setSearchType('resort')}
              className="rounded-l-none"
            >
              리조트
            </Button>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              필터{' '}
              {filters.specialties.length > 0 &&
                `(${filters.specialties.length})`}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                showMobileFilters ? 'rotate-180' : ''
              }`}
            />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              type={searchType}
            />
          </div>

          {/* Mobile Filters - Collapsible */}
          {showMobileFilters && (
            <div className="lg:hidden col-span-1 mb-6">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters}
                type={searchType}
              />
            </div>
          )}

          {/* Results */}
          <div className="col-span-1 lg:col-span-3">
            <SearchResults
              type={searchType}
              results={filteredResults}
              loading={loading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onSave={handleSave}
              savedItems={savedItems}
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

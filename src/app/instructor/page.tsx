'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  SearchFilters,
  SearchFiltersState,
} from '@/components/search/SearchFilters';
import { SearchResults } from '@/components/search/SearchResults';
import { InstructorProfile } from '@/types';
import { Timestamp } from 'firebase/firestore';

// Mock data - in real app, this would come from Firebase
const mockInstructors: InstructorProfile[] = [
  {
    id: '1',
    userId: 'user1',
    name: 'Sarah Johnson',
    bio: 'Passionate diving instructor with over 8 years of experience teaching divers of all levels. Specialized in underwater photography and marine conservation.',
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
    specialties: [
      'Underwater Photography',
      'Night Diving',
      'Deep Diving',
      'Marine Conservation',
    ],
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
      {
        name: 'Advanced Open Water',
        description: 'Take your diving to the next level',
        price: 350,
        currency: 'USD',
        duration: '2 days',
        maxParticipants: 6,
      },
    ],
    gallery: [],
    socialLinks: { instagram: 'https://instagram.com/sarahdives' },
    stats: { views: 1250, saves: 89, inquiries: 23 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2020-01-15')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-15')),
  },
  {
    id: '2',
    userId: 'user2',
    name: 'Mike Rodriguez',
    bio: 'Technical diving specialist with 12 years of experience. Expert in cave diving and deep water exploration.',
    location: { latitude: 25.7617, longitude: -80.1918 },
    address: 'Miami, Florida, USA',
    certifications: [
      {
        name: 'Technical Diving Instructor',
        organization: 'TDI',
        level: 'Instructor',
        issueDate: Timestamp.fromDate(new Date('2012-08-20')),
      },
    ],
    experience: 12,
    specialties: [
      'Technical Diving',
      'Cave Diving',
      'Deep Diving',
      'Wreck Diving',
    ],
    languages: ['English', 'Spanish'],
    services: [
      {
        name: 'Technical Diving Course',
        description: 'Advanced technical diving training',
        price: 800,
        currency: 'USD',
        duration: '5 days',
        maxParticipants: 3,
      },
      {
        name: 'Cave Diving Certification',
        description: 'Learn safe cave diving techniques',
        price: 600,
        currency: 'USD',
        duration: '4 days',
        maxParticipants: 2,
      },
    ],
    gallery: [],
    socialLinks: { website: 'https://miketech-diving.com' },
    stats: { views: 890, saves: 67, inquiries: 15 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2019-05-10')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-10')),
  },
  {
    id: '3',
    userId: 'user3',
    name: 'Emma Thompson',
    bio: 'Marine biologist and diving instructor passionate about ocean conservation and underwater education.',
    location: { latitude: -16.5004, longitude: 145.7781 },
    address: 'Cairns, Queensland, Australia',
    certifications: [
      {
        name: 'Master Scuba Diver Trainer',
        organization: 'PADI',
        level: 'MSDT',
        issueDate: Timestamp.fromDate(new Date('2018-03-12')),
      },
    ],
    experience: 6,
    specialties: [
      'Marine Conservation',
      'Underwater Photography',
      'Night Diving',
      'Open Water',
    ],
    languages: ['English'],
    services: [
      {
        name: 'Eco Diving Tour',
        description: 'Educational diving with marine conservation focus',
        price: 120,
        currency: 'USD',
        duration: '1 day',
        maxParticipants: 8,
      },
      {
        name: 'Marine Biology Course',
        description: 'Learn about marine ecosystems while diving',
        price: 300,
        currency: 'USD',
        duration: '3 days',
        maxParticipants: 6,
      },
    ],
    gallery: [],
    socialLinks: {
      instagram: 'https://instagram.com/emmadives',
      youtube: 'https://youtube.com/c/emmathompson',
    },
    stats: { views: 2100, saves: 156, inquiries: 45 },
    isApproved: true,
    isActive: true,
    createdAt: Timestamp.fromDate(new Date('2021-02-28')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-20')),
  },
];

export default function InstructorsPage() {
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

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...mockInstructors];

    // Apply filters
    if (filters.query) {
      results = results.filter(
        (instructor) =>
          instructor.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          instructor.bio.toLowerCase().includes(filters.query.toLowerCase()) ||
          instructor.address.toLowerCase().includes(filters.query.toLowerCase())
      );
    }

    if (filters.location) {
      results = results.filter((instructor) =>
        instructor.address
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      );
    }

    if (filters.specialties.length > 0) {
      results = results.filter((instructor) =>
        filters.specialties.some((specialty) =>
          instructor.specialties.includes(specialty)
        )
      );
    }

    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) {
      results = results.filter((instructor) => {
        const minPrice = Math.min(...instructor.services.map((s) => s.price));
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
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    return results;
  }, [filters, sortBy]);

  const handleSave = (instructorId: string) => {
    setSavedItems((prev) =>
      prev.includes(instructorId)
        ? prev.filter((id) => id !== instructorId)
        : [...prev, instructorId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            다이빙 강사 찾기
          </h1>
          <p className="text-gray-600">
            자격을 갖춘 다이빙 강사를 찾아 수중 기술을 향상시켜보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              type="instructor"
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <SearchResults
              type="instructor"
              results={filteredResults}
              loading={loading}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onSave={handleSave}
              savedItems={savedItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

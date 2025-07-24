'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import { MapPin, Heart, Eye, Wifi, Car, Utensils } from 'lucide-react';
import { ResortProfile } from '@/types';

interface ResortCardProps {
  resort: ResortProfile;
  onSave?: (resortId: string) => void;
  isSaved?: boolean;
}

export function ResortCard({
  resort,
  onSave,
  isSaved = false,
}: ResortCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(resort.id);
  };

  // Get facility icons
  const getFacilityIcon = (facility: string) => {
    if (facility.toLowerCase().includes('wifi'))
      return <Wifi className="h-3 w-3" />;
    if (
      facility.toLowerCase().includes('transfer') ||
      facility.toLowerCase().includes('car')
    )
      return <Car className="h-3 w-3" />;
    if (
      facility.toLowerCase().includes('restaurant') ||
      facility.toLowerCase().includes('bar')
    )
      return <Utensils className="h-3 w-3" />;
    return null;
  };

  return (
    <Link href={`/resort/${resort.id}`}>
      <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-green-300">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <DefaultAvatar type="resort" name={resort.name} size="lg" />
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {resort.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{resort.address}</span>
                  </div>
                </div>

                {/* Save Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSave}
                  className={`ml-2 ${
                    isSaved ? 'text-red-600 border-red-600 bg-red-50' : ''
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                  />
                </Button>
              </div>

              {/* Spacing */}
              <div className="h-3"></div>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {resort.description}
              </p>

              {/* Top Facilities */}
              <div className="flex flex-wrap gap-1 mb-3">
                {resort.facilities.slice(0, 4).map((facility, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    {getFacilityIcon(facility)}
                    {facility}
                  </Badge>
                ))}
                {resort.facilities.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{resort.facilities.length - 4}개 더
                  </Badge>
                )}
              </div>

              {/* Stats and Price */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span>조회수 {resort.stats.views.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-green-600">
                    ${Math.min(...resort.packages.map((p) => p.price))}부터
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

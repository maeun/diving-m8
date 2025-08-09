'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import { MapPin, Calendar, Heart, Eye } from 'lucide-react';
import { InstructorProfile } from '@/types';

interface InstructorCardProps {
  instructor: InstructorProfile;
  onSave?: (instructorId: string) => void;
  isSaved?: boolean;
}

export function InstructorCard({
  instructor,
  onSave,
  isSaved = false,
}: InstructorCardProps) {
  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSave?.(instructor.id);
  };

  return (
    <Link href={`/instructor/${instructor.id}`}>
      <Card className="card-standard cursor-pointer hover:border-[var(--brand-primary)]/30">
        <CardContent className="p-6">
          <div className="flex gap-4">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <DefaultAvatar
                type="instructor"
                name={instructor.name}
                size="lg"
              />
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">
                    {instructor.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{instructor.address}</span>
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

              {/* Experience */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                  <Calendar className="h-4 w-4 text-brand-primary" />
                  <span className="text-sm text-brand-primary font-medium">
                    {instructor.experience}년 경력
                  </span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {instructor.bio}
              </p>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1 mb-3">
                {instructor.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {instructor.specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{instructor.specialties.length - 3}개 더
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4 text-gray-500" />
                  <span>조회수 {instructor.stats.views.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-brand-primary">
                    ${Math.min(...instructor.services.map((s) => s.price))}부터
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

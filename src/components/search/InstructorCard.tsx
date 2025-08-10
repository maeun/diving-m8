'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import { AccessibleRating } from '@/components/ui/accessible-components';
import { MapPin, Calendar, Heart, Eye, Shield, Star } from 'lucide-react';
import { InstructorProfile } from '@/types';

interface InstructorCardProps {
  instructor: InstructorProfile;
  onSave?: (instructorId: string) => void;
  isSaved?: boolean;
  loading?: boolean;
}

export function InstructorCard({
  instructor,
  onSave,
  isSaved = false,
  loading = false,
}: InstructorCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      await onSave?.(instructor.id);
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate accessible description
  const cardDescription = `${instructor.name}, ${instructor.experience}년 경력 다이빙 강사, ${instructor.address} 위치, ${instructor.specialties.slice(0, 3).join(', ')} 전문`;
  const minPrice = Math.min(...instructor.services.map((s) => s.price));

  return (
    <Card 
      className="card-standard cursor-pointer hover:border-[var(--brand-primary)]/30 hover:shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2"
      role="article"
      aria-labelledby={`instructor-${instructor.id}-name`}
      aria-describedby={`instructor-${instructor.id}-desc`}
    >
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
                <Link 
                  href={`/instructor/${instructor.id}`}
                  className="group focus:outline-none"
                >
                  <h3 
                    id={`instructor-${instructor.id}-name`}
                    className="font-semibold text-lg text-gray-900 truncate group-hover:text-brand-primary transition-colors"
                  >
                    {instructor.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  <span className="truncate">{instructor.address}</span>
                </div>
              </div>

              {/* Save Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                disabled={isProcessing}
                className={`ml-2 ${
                  isSaved ? 'text-red-600 border-red-600 bg-red-50' : ''
                }`}
                aria-label={isSaved ? '저장 취소' : '강사 저장'}
                aria-pressed={isSaved}
              >
                {isProcessing ? (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true" />
                ) : (
                  <Heart
                    className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                    aria-hidden="true"
                  />
                )}
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-2 mb-3">
              {instructor.isApproved && (
                <Badge className="bg-green-100 text-green-800 text-xs">
                  <Shield className="h-3 w-3 mr-1" aria-hidden="true" />
                  인증완료
                </Badge>
              )}
              
              {/* Mock rating - replace with real data */}
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                <span className="font-medium text-sm">4.8</span>
                <span className="text-gray-500 text-xs">(12 리뷰)</span>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                <Calendar className="h-4 w-4 text-brand-primary" aria-hidden="true" />
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

            {/* Stats and Price */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-500">
                <Eye className="h-4 w-4" aria-hidden="true" />
                <span>조회수 {instructor.stats.views.toLocaleString()}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">체험 다이빙부터</span>
                <div className="font-semibold text-lg text-brand-primary">
                  ₩{minPrice?.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen reader description */}
        <div id={`instructor-${instructor.id}-desc`} className="sr-only">
          {cardDescription}
        </div>
      </CardContent>
    </Card>
  );
}

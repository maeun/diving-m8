'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { CardSkeleton } from '@/components/ui/card-skeleton';
import { DefaultAvatar } from '@/components/ui/default-avatar';
import {
  MapPin,
  Calendar,
  Award,
  Globe,
  ExternalLink,
  MessageCircle,
  Heart,
  Share2,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Music,
  Eye,
} from 'lucide-react';
import { InstructorProfile } from '@/types';
import { Timestamp } from 'firebase/firestore';
import { getInstructorById } from '@/services/instructorService';

interface InstructorProfileViewProps {
  instructorId: string;
}

export function InstructorProfileView({
  instructorId,
}: InstructorProfileViewProps) {
  const [instructor, setInstructor] = useState<InstructorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchInstructor = async () => {
      setLoading(true);
      try {
        const instructorData = await getInstructorById(instructorId);
        setInstructor(instructorData);
      } catch (error) {
        console.error('Error fetching instructor:', error);
        setInstructor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [instructorId]);

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app: save/unsave instructor
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${instructor?.name} - Diving Instructor`,
        text: instructor?.bio,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleContact = () => {
    // In real app: open contact modal or redirect to messaging
    alert('Contact feature would be implemented here');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <CardSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
            <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!instructor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">
              강사를 찾을 수 없습니다
            </h2>
            <p className="text-gray-600">
              찾고 계신 강사 프로필이 존재하지 않습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <DefaultAvatar
                  name={instructor.name}
                  type="instructor"
                  size="xl"
                  imageUrl={instructor.profileImage} // 이미지가 없으면 fallback
                />
              </div>

              {/* Basic Info */}
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {instructor.name}
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">
                        {instructor.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-blue-700 font-medium">
                          {instructor.experience}년 경력
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSave}
                      className={
                        isSaved ? 'text-red-600 border-red-600 bg-red-50' : ''
                      }
                    >
                      <Heart
                        className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`}
                      />
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {instructor.bio}
                </p>

                {/* Specialties */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    전문 분야
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>서비스 & 코스</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructor.services.map((service, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{service.name}</h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          ${service.price} {service.currency}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.duration}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3">{service.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>갤러리</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {instructor.gallery.map((media, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={media.url}
                          alt={media.caption || `Gallery image ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  자격증
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructor.certifications.map((cert, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-gray-600">
                      {cert.organization} - {cert.level}
                    </p>
                    <p className="text-xs text-gray-500">
                      Issued: {cert.issueDate.toDate().toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>소셜 미디어</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {instructor.socialLinks.website && (
                  <a
                    href={instructor.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Globe className="h-5 w-5 text-gray-600" />
                    <span>Website</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {instructor.socialLinks.instagram && (
                  <a
                    href={instructor.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <span>Instagram</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {instructor.socialLinks.facebook && (
                  <a
                    href={instructor.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {instructor.socialLinks.youtube && (
                  <a
                    href={instructor.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Youtube className="h-5 w-5 text-red-600" />
                    <span>YouTube</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {instructor.socialLinks.twitter && (
                  <a
                    href={instructor.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <span>X (Twitter)</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
                {instructor.socialLinks.tiktok && (
                  <a
                    href={instructor.socialLinks.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Music className="h-5 w-5 text-black" />
                    <span>TikTok</span>
                    <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                  </a>
                )}
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>프로필 통계</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">조회수</span>
                  <span className="font-medium">
                    {instructor.stats.views.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">저장수</span>
                  <span className="font-medium">{instructor.stats.saves}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

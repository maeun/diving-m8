'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Heart } from 'lucide-react';
import Link from 'next/link';

// Mock data for featured instructors and resorts
const featuredInstructors = [
  {
    id: '1',
    name: '김선우',
    title: 'PADI MSDT',
    location: '제주도',
    specialties: ['오픈워터', '어드밴스드', '레스큐'],
    image: '/images/instructor-1.jpg',
    price: '150,000원',
  },
  {
    id: '2',
    name: '이아야카',
    title: 'SSI 강사',
    location: '부산',
    specialties: ['나이트록스', '딥다이빙'],
    image: '/images/instructor-2.jpg',
    price: '120,000원',
  },
  {
    id: '3',
    name: '박민지',
    title: 'PADI IDC Staff',
    location: '강릉',
    specialties: ['드라이슈트', '수중사진'],
    image: '/images/instructor-3.jpg',
    price: '180,000원',
  },
];

const featuredResorts = [
  {
    id: '1',
    name: '제주 블루다이브 리조트',
    location: '제주도 서귀포시',
    facilities: ['장비대여', '나이트록스', '보트다이빙'],
    image: '/images/resort-1.jpg',
    price: '80,000원/일',
  },
  {
    id: '2',
    name: '울진 동해다이빙센터',
    location: '경북 울진군',
    facilities: ['드라이슈트', '테크니컬', '난파선'],
    image: '/images/resort-2.jpg',
    price: '70,000원/일',
  },
  {
    id: '3',
    name: '통영 바다별 다이빙',
    location: '경남 통영시',
    facilities: ['비치다이빙', '보트다이빙', '수중촬영'],
    image: '/images/resort-3.jpg',
    price: '60,000원/일',
  },
];

export function FeaturedSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Featured Instructors */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                인기 강사
              </h2>
              <p className="text-gray-600">
                검증된 전문 강사들과 함께 안전한 다이빙을 경험하세요
              </p>
            </div>
            <Link href="/search?type=instructor">
              <Button variant="outline">모든 강사 보기</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredInstructors.map((instructor) => (
              <Card
                key={instructor.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-0 shadow-md py-0"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-600 rounded-t-xl overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%2020c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10zm10%200c0-5.5-4.5-10-10-10s-10%204.5-10%2010%204.5%2010%2010%2010%2010-4.5%2010-10z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
                    </div>

                    {/* Instructor avatar and certification badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 overflow-hidden">
                          <Users className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                          {instructor.title.split(' ')[0]}
                        </div>
                      </div>
                    </div>

                    {/* Floating elements */}
                    <div className="absolute top-4 left-4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-6 left-6 w-2 h-2 bg-cyan-200/40 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-8 right-12 w-4 h-4 bg-white/20 rounded-full animate-pulse delay-500"></div>

                    <button
                      className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                      aria-label={`${instructor.name} 강사를 즐겨찾기에 추가`}
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {instructor.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {instructor.title}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {instructor.location}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {instructor.specialties.slice(0, 2).map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="outline"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                      {instructor.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{instructor.specialties.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-primary">
                        {instructor.price}
                      </div>
                      <Link href={`/instructor/${instructor.id}`}>
                        <Button size="sm">자세히 보기</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Resorts */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                추천 리조트
              </h2>
              <p className="text-gray-600">
                최고의 시설과 서비스를 제공하는 다이빙 리조트
              </p>
            </div>
            <Link href="/search?type=resort">
              <Button variant="outline">모든 리조트 보기</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredResorts.map((resort) => (
              <Card
                key={resort.id}
                className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-0 shadow-md py-0"
              >
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-t-xl overflow-hidden">
                    {/* Background pattern for resorts */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22white%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M30%2030c0-8.3-6.7-15-15-15s-15%206.7-15%2015%206.7%2015%2015%2015%2015-6.7%2015-15zm15%200c0-8.3-6.7-15-15-15s-15%206.7-15%2015%206.7%2015%2015%2015%2015-6.7%2015-15z%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
                    </div>

                    {/* Resort building icon with location badge */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/30">
                          <MapPin className="h-12 w-12 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 bg-emerald-400 text-emerald-900 text-xs font-bold px-2 py-1 rounded-full">
                          리조트
                        </div>
                      </div>
                    </div>

                    {/* Wave-like floating elements */}
                    <div className="absolute top-6 left-6 w-8 h-2 bg-white/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-10 left-8 w-6 h-2 bg-white/15 rounded-full animate-pulse delay-500"></div>
                    <div className="absolute top-14 left-10 w-4 h-2 bg-white/10 rounded-full animate-pulse delay-1000"></div>

                    <div className="absolute bottom-6 right-6 w-8 h-2 bg-cyan-200/30 rounded-full animate-pulse delay-700"></div>
                    <div className="absolute bottom-10 right-8 w-6 h-2 bg-cyan-200/25 rounded-full animate-pulse delay-1200"></div>

                    <button
                      className="absolute top-3 right-3 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                      aria-label={`${resort.name}을 즐겨찾기에 추가`}
                    >
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">
                          {resort.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {resort.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {resort.facilities.slice(0, 2).map((facility) => (
                        <Badge
                          key={facility}
                          variant="outline"
                          className="text-xs"
                        >
                          {facility}
                        </Badge>
                      ))}
                      {resort.facilities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{resort.facilities.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-primary">
                        {resort.price}
                      </div>
                      <Link href={`/resort/${resort.id}`}>
                        <Button size="sm">자세히 보기</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

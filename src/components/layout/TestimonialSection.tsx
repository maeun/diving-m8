'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: '김민수',
    location: '서울',
    comment:
      '제주도에서 처음 다이빙을 배웠는데, 강사님이 정말 친절하고 안전하게 가르쳐주셨어요. 바다 속 세상이 이렇게 아름다운 줄 몰랐습니다!',
    course: '오픈워터 다이버',
    date: '2024.01.15',
  },
  {
    id: 2,
    name: '이지은',
    location: '부산',
    comment:
      '어드밴스드 과정을 통해 더 깊은 바다를 경험할 수 있었어요. 야간 다이빙은 정말 환상적이었습니다. 강사님의 전문적인 지도 덕분에 안전하게 즐길 수 있었어요.',
    course: '어드밴스드 오픈워터',
    date: '2024.02.03',
  },
  {
    id: 3,
    name: '박준호',
    location: '대구',
    comment:
      '리조트 시설이 정말 깔끔하고 장비도 최신이었어요. 직원분들이 모두 친절하시고, 다이빙 포인트도 다양해서 매번 새로운 경험을 할 수 있었습니다.',
    course: '펀다이빙',
    date: '2024.01.28',
  },
  {
    id: 4,
    name: '최수연',
    location: '인천',
    comment:
      '레스큐 다이버 과정이 정말 유익했어요. 응급상황 대처법을 배우면서 더 안전한 다이버가 된 것 같습니다. 강사님의 실무 경험담도 정말 도움이 되었어요.',
    course: '레스큐 다이버',
    date: '2024.02.10',
  },
  {
    id: 5,
    name: '정현우',
    location: '광주',
    comment:
      '수중 사진 촬영 교육을 받았는데, 바다 속 생물들을 아름답게 담을 수 있게 되었어요. 전문적인 팁들을 많이 배울 수 있어서 정말 만족스러웠습니다.',
    course: '수중 사진',
    date: '2024.01.20',
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isClient]);

  if (!isClient) {
    return null; // or a loading skeleton
  }

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      result.push({
        ...testimonials[index],
        position: i,
      });
    }
    return result;
  };

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            바다 속에서 만난 특별한 순간들
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            다이빙 메이트와 함께한 다이버들의 진솔한 이야기를 들어보세요
            <br />
            <span className="text-sm text-gray-500">
              실제 경험담을 바탕으로 한 생생한 후기입니다
            </span>
          </p>
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden sm:block relative h-80 mb-8">
          <div className="flex items-center justify-center h-full">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${currentIndex}`}
                className={`absolute transition-all duration-700 ease-in-out ${
                  index === 1
                    ? 'z-20 scale-100 opacity-100'
                    : index === 0
                    ? 'z-10 -translate-x-80 scale-90 opacity-40'
                    : 'z-10 translate-x-80 scale-90 opacity-40'
                }`}
                style={{
                  transform: `translateX(${
                    index === 1 ? '0' : index === 0 ? '-320px' : '320px'
                  }) scale(${index === 1 ? '1' : '0.9'})`,
                }}
              >
                <Card className="w-150 mx-4 card-standard h-[300px]">
                  <CardContent className="p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <Quote className="h-8 w-8 text-brand-primary/20 mr-3" />
                      </div>

                      <p className="text-gray-700 mb-4 leading-relaxed line-clamp-4">
                        "{testimonial.comment}"
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {testimonial.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-brand-primary">
                            {testimonial.course}
                          </p>
                          <p className="text-xs text-gray-400">
                            {testimonial.date}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: 1 card */}
        <div className="sm:hidden">
          <div className="flex justify-center">
            <Card className="w-full max-w-sm card-standard">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-brand-primary/20 mr-3" />
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  "{testimonials[currentIndex].comment}"
                </p>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-brand-primary">
                        {testimonials[currentIndex].course}
                      </p>
                      <p className="text-xs text-gray-400">
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-[var(--transition-normal)] ${
                index === currentIndex ? 'bg-brand-primary w-8' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

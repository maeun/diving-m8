'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  Building2,
  GraduationCap,
  Shield,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Globe,
  User,
  AlertTriangle,
} from 'lucide-react';
import {
  VerificationRequest,
  VerificationDocument,
  BusinessInfo,
  ContactInfo,
} from '@/types';

interface VerificationRequestProps {
  userType: 'instructor' | 'resort';
  existingRequest?: VerificationRequest;
  onSubmit: (data: Partial<VerificationRequest>) => Promise<void>;
  onCancel?: () => void;
}

export function VerificationRequestComponent({
  userType,
  existingRequest,
  onSubmit,
  onCancel,
}: VerificationRequestProps) {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<
    VerificationDocument[]
  >(existingRequest?.documents || []);

  // Form state
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(
    existingRequest?.businessInfo || {
      businessName: '',
      businessNumber: '',
      businessType: userType === 'instructor' ? 'individual' : 'company',
      establishedYear: new Date().getFullYear(),
      description: '',
      website: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '대한민국',
      },
    }
  );

  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    existingRequest?.contactInfo || {
      primaryContact: {
        name: '',
        position: userType === 'instructor' ? '강사' : '대표',
        email: '',
        phone: '',
      },
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
      },
    }
  );

  const requiredDocuments = {
    instructor: [
      { type: 'certification', name: '다이빙 자격증', required: true },
      { type: 'id_card', name: '신분증', required: true },
      { type: 'insurance', name: '보험증서', required: false },
    ],
    resort: [
      { type: 'business_license', name: '사업자등록증', required: true },
      { type: 'insurance', name: '보험증서', required: true },
      { type: 'certification', name: '다이빙센터 인증서', required: false },
    ],
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    // 실제 구현에서는 파일을 서버에 업로드
    const mockUrl = URL.createObjectURL(file);

    const newDocument: VerificationDocument = {
      id: Date.now().toString(),
      type: documentType as any,
      name: file.name,
      url: mockUrl,
      uploadedAt: new Date() as any,
      verified: false,
    };

    setUploadedDocuments((prev) => [...prev, newDocument]);
  };

  const removeDocument = (documentId: string) => {
    setUploadedDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const verificationData: Partial<VerificationRequest> = {
        userType,
        status: 'pending',
        documents: uploadedDocuments,
        businessInfo,
        contactInfo,
        submittedAt: new Date() as any,
      };

      await onSubmit(verificationData);
    } catch (error) {
      console.error('인증 요청 제출 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return (
          businessInfo.businessName &&
          businessInfo.description &&
          businessInfo.address.street &&
          businessInfo.address.city
        );
      case 2:
        return (
          contactInfo.primaryContact.name &&
          contactInfo.primaryContact.email &&
          contactInfo.primaryContact.phone
        );
      case 3:
        const required = requiredDocuments[userType].filter(
          (doc) => doc.required
        );
        return required.every((reqDoc) =>
          uploadedDocuments.some((doc) => doc.type === reqDoc.type)
        );
      default:
        return false;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800',
        icon: Clock,
        text: '검토 대기',
      },
      under_review: {
        color: 'bg-blue-100 text-blue-800',
        icon: AlertCircle,
        text: '검토 중',
      },
      approved: {
        color: 'bg-green-100 text-green-800',
        icon: CheckCircle,
        text: '승인됨',
      },
      rejected: { color: 'bg-red-100 text-red-800', icon: X, text: '거부됨' },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  // 기존 요청이 있고 승인되지 않은 상태라면 상태 표시
  if (existingRequest && existingRequest.status !== 'approved') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {userType === 'instructor' ? (
                <GraduationCap className="h-5 w-5 text-blue-600" />
              ) : (
                <Building2 className="h-5 w-5 text-green-600" />
              )}
              {userType === 'instructor' ? '강사' : '리조트'} 인증 현황
            </CardTitle>
            {getStatusBadge(existingRequest.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              인증 요청이 제출되었습니다
            </h3>
            <p className="text-gray-600 mb-4">
              관리자가 제출하신 서류를 검토하고 있습니다. 일반적으로 1-3일 정도
              소요됩니다.
            </p>
            <div className="text-sm text-gray-500">
              제출일:{' '}
              {new Date(
                existingRequest.submittedAt.seconds * 1000
              ).toLocaleDateString()}
            </div>
          </div>

          {existingRequest.status === 'rejected' &&
            existingRequest.rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-1">거부 사유</h4>
                    <p className="text-red-700 text-sm">
                      {existingRequest.rejectionReason}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 border-red-300 text-red-700 hover:bg-red-50"
                      onClick={() => window.location.reload()}
                    >
                      다시 신청하기
                    </Button>
                  </div>
                </div>
              </div>
            )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    currentStep === step
                      ? 'bg-blue-600 text-white'
                      : isStepComplete(step)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isStepComplete(step) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      isStepComplete(step) ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">
              {userType === 'instructor' ? '강사' : '리조트'} 인증 신청
            </h2>
            <p className="text-gray-600">
              {currentStep === 1 && '사업자 정보를 입력해주세요'}
              {currentStep === 2 && '연락처 정보를 입력해주세요'}
              {currentStep === 3 && '필요한 서류를 업로드해주세요'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">사업자 정보</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">
                    {userType === 'instructor' ? '활동명' : '사업체명'} *
                  </Label>
                  <Input
                    id="businessName"
                    value={businessInfo.businessName}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        businessName: e.target.value,
                      }))
                    }
                    placeholder={
                      userType === 'instructor'
                        ? '김다이버'
                        : '바다별 다이빙센터'
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessNumber">사업자등록번호</Label>
                  <Input
                    id="businessNumber"
                    value={businessInfo.businessNumber}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        businessNumber: e.target.value,
                      }))
                    }
                    placeholder="123-45-67890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="establishedYear">설립/시작 연도</Label>
                  <Input
                    id="establishedYear"
                    type="number"
                    value={businessInfo.establishedYear}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        establishedYear: parseInt(e.target.value),
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">웹사이트</Label>
                  <Input
                    id="website"
                    value={businessInfo.website}
                    onChange={(e) =>
                      setBusinessInfo((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">소개 *</Label>
                <Textarea
                  id="description"
                  value={businessInfo.description}
                  onChange={(e) =>
                    setBusinessInfo((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder={
                    userType === 'instructor'
                      ? '다이빙 경력과 전문 분야를 소개해주세요...'
                      : '리조트의 특징과 제공 서비스를 소개해주세요...'
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  주소 정보 *
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="street">상세 주소</Label>
                    <Input
                      id="street"
                      value={businessInfo.address.street}
                      onChange={(e) =>
                        setBusinessInfo((prev) => ({
                          ...prev,
                          address: { ...prev.address, street: e.target.value },
                        }))
                      }
                      placeholder="서울특별시 강남구 테헤란로 123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">도시</Label>
                    <Input
                      id="city"
                      value={businessInfo.address.city}
                      onChange={(e) =>
                        setBusinessInfo((prev) => ({
                          ...prev,
                          address: { ...prev.address, city: e.target.value },
                        }))
                      }
                      placeholder="서울"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">우편번호</Label>
                    <Input
                      id="zipCode"
                      value={businessInfo.address.zipCode}
                      onChange={(e) =>
                        setBusinessInfo((prev) => ({
                          ...prev,
                          address: { ...prev.address, zipCode: e.target.value },
                        }))
                      }
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">연락처 정보</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">주 담당자 정보</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryName">이름 *</Label>
                      <Input
                        id="primaryName"
                        value={contactInfo.primaryContact.name}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            primaryContact: {
                              ...prev.primaryContact,
                              name: e.target.value,
                            },
                          }))
                        }
                        placeholder="김다이버"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryPosition">직책</Label>
                      <Input
                        id="primaryPosition"
                        value={contactInfo.primaryContact.position}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            primaryContact: {
                              ...prev.primaryContact,
                              position: e.target.value,
                            },
                          }))
                        }
                        placeholder={
                          userType === 'instructor' ? '강사' : '대표'
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryEmail">이메일 *</Label>
                      <Input
                        id="primaryEmail"
                        type="email"
                        value={contactInfo.primaryContact.email}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            primaryContact: {
                              ...prev.primaryContact,
                              email: e.target.value,
                            },
                          }))
                        }
                        placeholder="contact@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryPhone">전화번호 *</Label>
                      <Input
                        id="primaryPhone"
                        value={contactInfo.primaryContact.phone}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            primaryContact: {
                              ...prev.primaryContact,
                              phone: e.target.value,
                            },
                          }))
                        }
                        placeholder="010-1234-5678"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">비상 연락처 (선택)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyName">이름</Label>
                      <Input
                        id="emergencyName"
                        value={contactInfo.emergencyContact?.name || ''}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            emergencyContact: {
                              ...prev.emergencyContact!,
                              name: e.target.value,
                            },
                          }))
                        }
                        placeholder="이응급"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyRelation">관계</Label>
                      <Input
                        id="emergencyRelation"
                        value={contactInfo.emergencyContact?.relationship || ''}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            emergencyContact: {
                              ...prev.emergencyContact!,
                              relationship: e.target.value,
                            },
                          }))
                        }
                        placeholder="가족, 동료 등"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">전화번호</Label>
                      <Input
                        id="emergencyPhone"
                        value={contactInfo.emergencyContact?.phone || ''}
                        onChange={(e) =>
                          setContactInfo((prev) => ({
                            ...prev,
                            emergencyContact: {
                              ...prev.emergencyContact!,
                              phone: e.target.value,
                            },
                          }))
                        }
                        placeholder="010-9876-5432"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">서류 업로드</h3>
              </div>

              <div className="space-y-4">
                {requiredDocuments[userType].map((docType) => (
                  <div key={docType.type} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{docType.name}</h4>
                        {docType.required && (
                          <Badge variant="secondary" className="text-xs">
                            필수
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          id={`file-${docType.type}`}
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, docType.type);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            document
                              .getElementById(`file-${docType.type}`)
                              ?.click()
                          }
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          업로드
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {uploadedDocuments
                        .filter((doc) => doc.type === docType.type)
                        .map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">{doc.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(doc.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-sm">
                    <h4 className="font-medium text-blue-900 mb-1">
                      서류 업로드 안내
                    </h4>
                    <ul className="text-blue-800 space-y-1">
                      <li>• 파일 형식: PDF, JPG, PNG (최대 10MB)</li>
                      <li>• 선명하고 읽기 쉬운 이미지로 업로드해주세요</li>
                      <li>• 개인정보는 안전하게 보호됩니다</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <div>
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              이전
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <Button variant="ghost" onClick={onCancel}>
              취소
            </Button>
          )}

          {currentStep < 3 ? (
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!isStepComplete(currentStep)}
            >
              다음
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepComplete(3) || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : null}
              인증 요청 제출
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

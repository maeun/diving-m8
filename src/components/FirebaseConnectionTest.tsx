'use client';

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FirebaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    'checking' | 'connected' | 'error'
  >('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setConnectionStatus('checking');
      setErrorMessage('');

      console.log('🔍 Testing Firebase connection...');

      // Try to read from Firestore
      const testDocRef = doc(db, 'test', 'connection');
      const docSnap = await getDoc(testDocRef);

      console.log('✅ Firebase connection successful');
      setConnectionStatus('connected');
      setTestResult(
        `Connection successful! Document exists: ${docSnap.exists()}`
      );
    } catch (error: any) {
      console.error('❌ Firebase connection error:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Unknown error occurred');
      console.error('Firebase connection error:', error);
    }
  };

  const testWrite = async () => {
    try {
      const testDocRef = doc(db, 'test', 'connection');
      await setDoc(testDocRef, {
        timestamp: new Date(),
        message: 'Test connection successful',
        source: 'diving-mate-app',
      });
      setTestResult('Write test successful!');
    } catch (error: any) {
      setErrorMessage(`Write test failed: ${error.message}`);
      console.error('Firebase write error:', error);
    }
  };

  const getConnectionStatusColor = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'text-yellow-600';
      case 'connected':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Firebase 연결 확인 중...';
      case 'connected':
        return 'Firebase 연결 성공';
      case 'error':
        return 'Firebase 연결 실패';
      default:
        return '알 수 없는 상태';
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Firebase 연결 테스트</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className={`font-medium ${getConnectionStatusColor()}`}>
            {getConnectionStatusText()}
          </p>
          {testResult && (
            <p className="text-sm text-gray-600 mt-2">{testResult}</p>
          )}
          {errorMessage && (
            <p className="text-sm text-red-600 mt-2">오류: {errorMessage}</p>
          )}
        </div>

        <div className="space-y-2">
          <Button
            onClick={checkConnection}
            variant="outline"
            className="w-full"
          >
            연결 다시 확인
          </Button>
          {connectionStatus === 'connected' && (
            <Button onClick={testWrite} className="w-full">
              쓰기 테스트
            </Button>
          )}
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <strong>Project ID:</strong>{' '}
            {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}
          </p>
          <p>
            <strong>Auth Domain:</strong>{' '}
            {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}
          </p>
          <p>
            <strong>Environment:</strong> {process.env.NODE_ENV}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

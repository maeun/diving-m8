'use client';

import React, { useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SimpleFirebaseTest() {
  const [status, setStatus] = useState<string>('Ready to test');
  const [loading, setLoading] = useState(false);

  const testFirebase = async () => {
    setLoading(true);
    setStatus('Testing...');

    try {
      console.log('🔍 Starting Firebase test...');

      // Test write
      const testDoc = doc(db, 'test', 'simple-test');
      const testData = {
        message: 'Hello from Firebase!',
        timestamp: new Date(),
        random: Math.random(),
      };

      console.log('📝 Writing test document...');
      await setDoc(testDoc, testData);
      console.log('✅ Write successful');

      // Test read
      console.log('📖 Reading test document...');
      const docSnap = await getDoc(testDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('✅ Read successful:', data);
        setStatus(`✅ Success! Data: ${JSON.stringify(data, null, 2)}`);
      } else {
        console.log('❌ Document does not exist');
        setStatus('❌ Document does not exist');
      }
    } catch (error: any) {
      console.error('❌ Firebase test failed:', error);
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Simple Firebase Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testFirebase} disabled={loading} className="w-full">
          {loading ? 'Testing...' : 'Test Firebase Connection'}
        </Button>

        <div className="p-4 bg-gray-100 rounded-lg">
          <pre className="text-sm whitespace-pre-wrap">{status}</pre>
        </div>

        <div className="text-xs text-gray-500 space-y-1">
          <p>
            <strong>Project ID:</strong> demo-project
          </p>
          <p>
            <strong>Firestore:</strong> localhost:8081
          </p>
          <p>
            <strong>Environment:</strong> {process.env.NODE_ENV}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

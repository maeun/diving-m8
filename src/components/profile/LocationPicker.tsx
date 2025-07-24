'use client';

import React, { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { LocationFormData } from '@/lib/validations';

interface LocationPickerProps {
  form: UseFormReturn<any>;
  fieldPrefix?: string;
  addressFieldName?: string;
}

export function LocationPicker({
  form,
  fieldPrefix = 'location',
  addressFieldName = 'address',
}: LocationPickerProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getFieldName = (field: string) => `${fieldPrefix}.${field}` as const;
  const getError = (field: string) => {
    const fieldPath = getFieldName(field).split('.');
    let error: any = errors;
    for (const path of fieldPath) {
      error = error?.[path];
    }
    return error?.message as string | undefined;
  };

  const currentLocation = watch(fieldPrefix);
  const currentAddress = watch(addressFieldName);

  // Simulate geocoding (in real app, use Google Maps Geocoding API)
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock geocoding result (in real app, call Google Maps API)
      const mockResults = [
        { lat: 37.7749, lng: -122.4194, address: 'San Francisco, CA, USA' },
        { lat: 40.7128, lng: -74.006, address: 'New York, NY, USA' },
        { lat: 34.0522, lng: -118.2437, address: 'Los Angeles, CA, USA' },
      ];

      const result =
        mockResults.find((r) =>
          r.address.toLowerCase().includes(searchQuery.toLowerCase())
        ) || mockResults[0];

      setValue(getFieldName('latitude'), result.lat);
      setValue(getFieldName('longitude'), result.lng);
      setValue(addressFieldName, result.address);
      setSearchQuery('');
    } catch (error) {
      console.error('Geocoding error:', error);
      alert('Error searching location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, setValue, fieldPrefix, addressFieldName]);

  const handleGetCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setValue(getFieldName('latitude'), latitude);
        setValue(getFieldName('longitude'), longitude);

        // Simulate reverse geocoding (in real app, use Google Maps API)
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          setValue(
            addressFieldName,
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );
        } catch (error) {
          console.error('Reverse geocoding error:', error);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Error getting your location. Please enter manually.');
      }
    );
  }, [setValue, fieldPrefix, addressFieldName]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </CardTitle>
        <p className="text-sm text-gray-600">
          Set your location to help customers find you
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address Field */}
        <div className="space-y-2">
          <Label htmlFor={addressFieldName}>Address</Label>
          <Input
            id={addressFieldName}
            placeholder="Enter your full address"
            {...register(addressFieldName)}
            className={errors[addressFieldName] ? 'border-red-500' : ''}
          />
          {errors[addressFieldName] && (
            <p className="text-sm text-red-500">
              {errors[addressFieldName]?.message as string}
            </p>
          )}
        </div>

        {/* Location Search */}
        <div className="space-y-2">
          <Label>Search Location</Label>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a location..."
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleSearch}
              disabled={isSearching || !searchQuery.trim()}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Location Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGetCurrentLocation}
          className="w-full"
        >
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>

        {/* Coordinates Display */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={getFieldName('latitude')}>Latitude</Label>
            <Input
              id={getFieldName('latitude')}
              type="number"
              step="any"
              placeholder="0.0000"
              {...register(getFieldName('latitude'), { valueAsNumber: true })}
              className={getError('latitude') ? 'border-red-500' : ''}
            />
            {getError('latitude') && (
              <p className="text-sm text-red-500">{getError('latitude')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor={getFieldName('longitude')}>Longitude</Label>
            <Input
              id={getFieldName('longitude')}
              type="number"
              step="any"
              placeholder="0.0000"
              {...register(getFieldName('longitude'), { valueAsNumber: true })}
              className={getError('longitude') ? 'border-red-500' : ''}
            />
            {getError('longitude') && (
              <p className="text-sm text-red-500">{getError('longitude')}</p>
            )}
          </div>
        </div>

        {/* Location Preview */}
        {currentLocation?.latitude && currentLocation?.longitude && (
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium">Selected Location:</p>
            <p className="text-sm text-gray-600">
              {currentAddress ||
                `${currentLocation.latitude}, ${currentLocation.longitude}`}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Coordinates: {currentLocation.latitude.toFixed(6)},{' '}
              {currentLocation.longitude.toFixed(6)}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

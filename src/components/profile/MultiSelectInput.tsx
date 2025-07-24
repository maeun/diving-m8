'use client';

import React, { useState, KeyboardEvent } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X } from 'lucide-react';

interface MultiSelectInputProps {
  form: UseFormReturn<any>;
  fieldName: string;
  label: string;
  description?: string;
  placeholder?: string;
  suggestions?: string[];
  maxItems?: number;
  icon?: React.ComponentType<{ className?: string }>;
  required?: boolean;
}

export function MultiSelectInput({
  form,
  fieldName,
  label,
  description,
  placeholder = 'Type and press Enter to add',
  suggestions = [],
  maxItems = 10,
  icon: Icon,
  required = false,
}: MultiSelectInputProps) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const currentValues: string[] = watch(fieldName) || [];
  const error = errors[fieldName]?.message as string | undefined;

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !currentValues.includes(suggestion)
  );

  const addValue = (value: string) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return;

    if (currentValues.includes(trimmedValue)) {
      alert('This item is already added');
      return;
    }

    if (currentValues.length >= maxItems) {
      alert(`Maximum ${maxItems} items allowed`);
      return;
    }

    setValue(fieldName, [...currentValues, trimmedValue]);
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeValue = (index: number) => {
    const newValues = currentValues.filter((_, i) => i !== index);
    setValue(fieldName, newValues);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addValue(inputValue);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setShowSuggestions(value.length > 0 && filteredSuggestions.length > 0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </CardTitle>
        {description && <p className="text-sm text-gray-600">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Input Field */}
        <div className="relative">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() =>
                setShowSuggestions(
                  inputValue.length > 0 && filteredSuggestions.length > 0
                )
              }
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={placeholder}
              className={error ? 'border-red-500' : ''}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => addValue(inputValue)}
              disabled={!inputValue.trim() || currentValues.length >= maxItems}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => addValue(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Selected Values */}
        {currentValues.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Items:</Label>
            <div className="flex flex-wrap gap-2">
              {currentValues.map((value, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1 pr-1"
                >
                  {value}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeValue(index)}
                    className="h-4 w-4 p-0 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Item Count */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            {currentValues.length} of {maxItems} items
          </span>
          {required && currentValues.length === 0 && (
            <span className="text-red-500">At least one item required</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

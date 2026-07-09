"use client";

import { useEffect, useRef, useState } from "react";

export interface AddressResult {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  formattedAddress: string;
}

interface Suggestion {
  placeId: string;
  text: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onAddressSelected: (address: AddressResult) => void;
  placeholder?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  onAddressSelected,
  placeholder = "Start typing your address...",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const ignoreNextSearch = useRef(false);
  const requestId = useRef(0);

  useEffect(() => {
    if (ignoreNextSearch.current) {
      ignoreNextSearch.current = false;
      return;
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const currentRequest = ++requestId.current;

      try {
        setLoading(true);

        const response = await fetch(
          `/api/google/autocomplete?q=${encodeURIComponent(value)}`
        );

        if (!response.ok) {
          console.error(await response.text());
          setSuggestions([]);
          return;
        }

        const results = (await response.json()) as Suggestion[];

        if (currentRequest !== requestId.current) return;

        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  async function selectSuggestion(suggestion: Suggestion) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/google/place?placeId=${encodeURIComponent(
          suggestion.placeId
        )}`
      );

      if (!response.ok) {
        console.error(await response.text());
        return;
      }

      const address = (await response.json()) as AddressResult;

      ignoreNextSearch.current = true;

      setSuggestions([]);
      setShowDropdown(false);

      // Parent owns ALL state updates
      onAddressSelected(address);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        autoComplete="off"
        placeholder={placeholder}
        className="w-full rounded-lg border p-3"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowDropdown(true);
          }
        }}
      />

      {loading && (
        <div className="absolute right-3 top-3 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border bg-white shadow-xl">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion.placeId}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                selectSuggestion(suggestion);
              }}
              className="block w-full border-b px-4 py-3 text-left hover:bg-blue-50 last:border-b-0"
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
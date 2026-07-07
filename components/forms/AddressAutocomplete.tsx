"use client";

import {
  useEffect,
  useRef,
} from "react";

import {
  extractAddress,
  AddressResult,
} from "@/lib/google/places";

interface AddressAutocompleteProps {

  value: string;

  onChange: (
    value: string
  ) => void;

  onAddressSelected: (
    address: AddressResult
  ) => void;

  placeholder?: string;

}

export default function AddressAutocomplete({

  value,

  onChange,

  onAddressSelected,

  placeholder = "Start typing an address...",

}: AddressAutocompleteProps) {

  const inputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {

    if (
      !window.google ||
      !inputRef.current
    ) {
      return;
    }

    const autocomplete =
      new google.maps.places.Autocomplete(
        inputRef.current,
        {

          componentRestrictions: {
            country: "au",
          },

          fields: [
            "address_components",
            "formatted_address",
          ],

          types: ["address"],

        }
      );

    autocomplete.addListener(
      "place_changed",
      () => {

        const place =
          autocomplete.getPlace();

        const address =
          extractAddress(place);

        onChange(
          address.formattedAddress
        );

        onAddressSelected(
          address
        );

      }
    );

  }, [onAddressSelected, onChange]);

  return (

    <input

      ref={inputRef}

      value={value}

      onChange={(e) =>
        onChange(
          e.target.value
        )
      }

      placeholder={placeholder}

      className="
        w-full
        rounded-lg
        border
        px-4
        py-3
      "

    />

  );

}
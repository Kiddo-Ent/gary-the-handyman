"use client";

import { useEffect, useRef } from "react";
import { AddressResult } from "@/lib/google/places";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let autocomplete: any;

    async function initialise() {
      if (!containerRef.current) return;

      // Wait until Google has loaded
      if (!(window as any).google?.maps) {
        console.warn("Google Maps API not loaded yet.");
        return;
      }

      const { PlaceAutocompleteElement } =
        (await (window as any).google.maps.importLibrary(
          "places"
        )) as any;

      autocomplete = new PlaceAutocompleteElement();

      autocomplete.setAttribute("placeholder", placeholder);

      autocomplete.addEventListener(
        "gmp-select",
        async (event: any) => {
          const prediction = event.placePrediction;

          const place = prediction.toPlace();

          await place.fetchFields({
            fields: [
              "formattedAddress",
              "addressComponents",
            ],
          });

          let streetNumber = "";
          let route = "";
          let suburb = "";
          let state = "";
          let postcode = "";

          for (const component of place.addressComponents) {
            const type = component.types[0];

            switch (type) {
              case "street_number":
                streetNumber = component.longText;
                break;

              case "route":
                route = component.longText;
                break;

              case "locality":
                suburb = component.longText;
                break;

              case "administrative_area_level_1":
                state = component.shortText;
                break;

              case "postal_code":
                postcode = component.longText;
                break;
            }
          }

          const street =
            `${streetNumber} ${route}`.trim();

          onChange(street);

          onAddressSelected({
            street,
            suburb,
            state,
            postcode,
            formattedAddress:
              place.formattedAddress,
          });
        }
      );

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(autocomplete);
    }

    initialise();

    return () => {
      if (
        autocomplete &&
        containerRef.current?.contains(autocomplete)
      ) {
        containerRef.current.removeChild(
          autocomplete
        );
      }
    };
  }, [onAddressSelected, onChange, placeholder]);

  return (
    <div className="space-y-2">
      <div ref={containerRef} />

      {/* Hidden input so FormData still includes address */}
      <input
        type="hidden"
        name="address"
        value={value}
        readOnly
      />
    </div>
  );
}
export interface AddressResult {
  street: string;
  suburb: string;
  state: string;
  postcode: string;
  formattedAddress: string;
}

export function extractAddress(
  place: google.maps.places.PlaceResult
): AddressResult {

  const result: AddressResult = {
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    formattedAddress:
      place.formatted_address ?? "",
  };

  if (!place.address_components) {
    return result;
  }

  let streetNumber = "";
  let route = "";

  for (const component of place.address_components) {

    const type = component.types[0];

    switch (type) {

      case "street_number":
        streetNumber = component.long_name;
        break;

      case "route":
        route = component.long_name;
        break;

      case "locality":
        result.suburb = component.long_name;
        break;

      case "administrative_area_level_1":
        result.state = component.short_name;
        break;

      case "postal_code":
        result.postcode = component.long_name;
        break;

    }

  }

  result.street =
    `${streetNumber} ${route}`.trim();

  return result;

}
export function googleMapsDirectionsUrl(lat: number, lng: number): string {
  const query = new URLSearchParams({ api: "1", destination: `${lat},${lng}` });
  return `https://www.google.com/maps/dir/?${query.toString()}`;
}

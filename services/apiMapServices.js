import { GOOGLE_MAPS_API_KEY } from '@env';

export const fetchPlaces = async (latitude, longitude) => {
  try {
    const types = ['gym', 'park', 'swimming_pool'];
    const promises = types.map(type =>
      fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
      ).then(response => response.json())
    );

    const results = await Promise.all(promises);
    const placesData = results.flatMap(data =>
      data.results.map(place => ({
        id: place.place_id,
        name: place.name,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        address: place.vicinity,
        type: place.types.find(t => types.includes(t)),
        photoReference: place.photos && place.photos.length > 0 ? place.photos[0].photo_reference : null
      }))
    );
    return placesData;
  } catch (error) {
    throw new Error('Failed to fetch places');
  }
};

export const getPhotoUrl = (photoReference) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${GOOGLE_MAPS_API_KEY}`;
};

import fetch from "node-fetch";

const GEMINI_URI = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";
const FOURSQUARE_KEY = process.env.FOURSQUARE_API;
const hasV2Credentials = process.env.FOURSQUARE_CLIENT_ID && process.env.FOURSQUARE_CLIENT_SECRET;

// ----------------- FOURSQUARE SEARCH -----------------
const searchPlaceByNameV3 = async (name, near) => {
  try {
    const url = `https://places-api.foursquare.com/places/search?query=${encodeURIComponent(name)}&near=${encodeURIComponent(near)}&limit=5`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${FOURSQUARE_KEY}`,
        Accept: "application/json",
        "X-Places-Api-Version": "2025-09-30",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.results?.length > 0 ? data.results[0] : null;
  } catch {
    return null;
  }
};

const getPlacePhotoV3 = async (fsq_id) => {
  try {
    const url = `https://places-api.foursquare.com/places/${fsq_id}/photos?limit=5`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${FOURSQUARE_KEY}`,
        Accept: "application/json",
        "X-Places-Api-Version": "2025-09-30",
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? `${data[0].prefix}original${data[0].suffix}` : null;
  } catch {
    return null;
  }
};

const searchPlaceByNameV2 = async (name, near) => {
  try {
    const version = "20231201";
    const clientId = process.env.FOURSQUARE_CLIENT_ID;
    const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;
    const url = `https://api.foursquare.com/v2/venues/search?query=${encodeURIComponent(name)}&near=${encodeURIComponent(near)}&limit=5&client_id=${clientId}&client_secret=${clientSecret}&v=${version}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.response?.venues?.length > 0) {
      const venue = data.response.venues[0];
      return {
        fsq_id: venue.id,
        name: venue.name,
        location: { formatted_address: venue.location?.formattedAddress?.join(", ") },
      };
    }
    return null;
  } catch {
    return null;
  }
};

const getPlacePhotoV2 = async (venue_id) => {
  try {
    const version = "20231201";
    const clientId = process.env.FOURSQUARE_CLIENT_ID;
    const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET;
    if (!clientId || !clientSecret) return null;
    const url = `https://api.foursquare.com/v2/venues/${venue_id}/photos?limit=1&client_id=${clientId}&client_secret=${clientSecret}&v=${version}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.response?.photos?.items?.length > 0) {
      const photo = data.response.photos.items[0];
      return `${photo.prefix}original${photo.suffix}`;
    }
    return null;
  } catch {
    return null;
  }
};

const searchPlaceByName = async (name, near) => {
  if (FOURSQUARE_KEY) {
    const result = await searchPlaceByNameV3(name, near);
    if (result) return result;
  }
  if (hasV2Credentials) {
    const result = await searchPlaceByNameV2(name, near);
    if (result) return result;
  }
  return null;
};

// ----------------- IMAGE FETCHING -----------------
const getUnsplashImage = async (placeName, destination) => {
  if (!process.env.UNSPLASH_KEY) return null;
  try {
    let query = placeName ? `${placeName} ${destination} landmark` : `${destination} landmark`;
    let res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_KEY}` } }
    );
    let data = await res.json();
    if (data.results?.length > 0) return data.results[0].urls.regular;

    // fallback to city only
    if (placeName) {
      query = `${destination} landmark`;
      res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${process.env.UNSPLASH_KEY}` } }
      );
      data = await res.json();
      if (data.results?.length > 0) return data.results[0].urls.regular;
    }

    return null;
  } catch (err) {
    console.error("Unsplash error:", err.error);
    return null;
  }
};

const getPexelsImage = async (placeName, destination) => {
  if (!process.env.PEXELS_API) return null;
  try {
    let query = placeName ? `${placeName} ${destination} landmark` : `${destination} landmark`;
    let res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: process.env.PEXELS_API } }
    );
    let data = await res.json();
    if (data.photos?.length > 0) return data.photos[0].src.large;

    // fallback to city only
    if (placeName) {
      query = `${destination} landmark`;
      res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
        { headers: { Authorization: process.env.PEXELS_API } }
      );
      data = await res.json();
      if (data.photos?.length > 0) return data.photos[0].src.large;
    }

    return null;
  } catch (err) {
    console.error("Pexels error:", err.error);
    return null;
  }
};

const getFallbackImage = async (placeName, destination) => {
  const unsplash = await getUnsplashImage(placeName, destination);
  if (unsplash) return unsplash;

  const pexels = await getPexelsImage(placeName, destination);
  if (pexels) return pexels;

  return null; // never use placeholder
};

// ----------------- UTILITIES -----------------
const cleanGeminiJSON = (text) => {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
  return JSON.parse(cleaned);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getSpecificLocation = (destination) => {
  const cityMap = {
    america: "New York, NY, USA",
    usa: "New York, NY, USA",
    "united states": "New York, NY, USA",
    us: "New York, NY, USA",
    "new york city": "New York, NY, USA",
    "los angeles": "Los Angeles, CA, USA",
    "san francisco": "San Francisco, CA, USA",
    chicago: "Chicago, IL, USA",
    miami: "Miami, FL, USA",
    "las vegas": "Las Vegas, NV, USA",
  };
  const lower = destination.toLowerCase().trim();
  return cityMap[lower] || destination;
};

const getPlacePhoto = async (fsq_id, placeName, destination) => {
  if (FOURSQUARE_KEY && fsq_id) {
    const photo = await getPlacePhotoV3(fsq_id);
    if (photo) return photo;
  }
  if (hasV2Credentials && fsq_id) {
    const photo = await getPlacePhotoV2(fsq_id);
    if (photo) return photo;
  }
  return await getFallbackImage(placeName, destination);
};

// ----------------- ITINERARY GENERATION -----------------
export const generateItenary = async (destination, startDate, endDate, budget) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dayCount = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

  const prompt = `Create a ${budget} budget travel itinerary for ${destination} from ${startDate} to ${endDate} (${dayCount} days). 
Generate exactly ${dayCount} days with real, famous places that exist in ${destination}. Use full names as on Google Maps. JSON only:
{
  "days": [
    {
      "day": 1,
      "city": "Specific City Name",
      "places": [
        { "name": "Exact Place Name", "type": "attraction|restaurant|hotel", "description": "Brief description" }
      ]
    }
  ]
}`;

  try {
    const res = await fetch(`${GEMINI_URI}?key=${process.env.GEMINI_API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json", temperature: 0.7 },
      }),
    });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return { success: false, error: "No response from Gemini" };

    const itinerary = cleanGeminiJSON(text);
    if (!itinerary?.days) return { success: false, error: "Invalid JSON from Gemini" };

    let totalPlaces = 0;
    let placesWithImages = 0;
    let foursquareHits = 0;

    for (const day of itinerary.days) {
      const searchLocation = getSpecificLocation(day.city || destination);
      for (const place of day.places) {
        totalPlaces++;
        let fsPlace = await searchPlaceByName(place.name, searchLocation);
        if (fsPlace) {
          foursquareHits++;
          place.foursquareId = fsPlace.fsq_id;
          place.address = fsPlace.location?.formatted_address || null;
        }
        const photo = await getPlacePhoto(fsPlace ? fsPlace.fsq_id : null, place.name, searchLocation);
        if (photo) {
          place.image = photo;
          placesWithImages++;
        } else {
          place.image = null;
        }
        await delay(400);
      }
    }

    let coverImage = null;
    for (const day of itinerary.days) {
      const firstWithImage = day.places.find((p) => p.image);
      if (firstWithImage) {
        coverImage = firstWithImage.image;
        break;
      }
    }
    if (!coverImage) coverImage = await getFallbackImage(null, destination);

    return {
      success: true,
      data: {
        ...itinerary,
        coverImage,
        stats: {
          totalPlaces,
          placesWithImages,
          foursquareMatches: foursquareHits,
          successRate: `${Math.round((placesWithImages / totalPlaces) * 100)}%`,
        },
      },
    };
  } catch (err) {
    return { success: false, error: "Failed to generate itinerary", error: err.error };
  }
};

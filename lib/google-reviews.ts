import type { PublicSettings } from "@/lib/store";

export type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
  authorUrl?: string;
};

export async function getGoogleReviews(settings: PublicSettings): Promise<GoogleReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = settings.googlePlaceId || process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return [];

  try {
    const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
    url.searchParams.set("place_id", placeId);
    url.searchParams.set("fields", "reviews");
    url.searchParams.set("reviews_sort", "newest");
    url.searchParams.set("key", apiKey);
    const response = await fetch(url, { next: { revalidate: 900 } });
    if (!response.ok) return [];
    const payload = await response.json() as { result?: { reviews?: Array<{ author_name?: string; rating?: number; text?: string; relative_time_description?: string; author_url?: string }> } };
    return (payload.result?.reviews || []).slice(0, 6).map((review) => ({ authorName: review.author_name || "Mitra Travels customer", rating: review.rating || 5, text: review.text || "", relativeTime: review.relative_time_description || "Recent review", authorUrl: review.author_url })).filter((review) => review.text);
  } catch {
    return [];
  }
}

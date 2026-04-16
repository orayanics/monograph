export async function getBooks(query: string, page: string) {
  const startIndex = (parseInt(page || "1") - 1) * 10;
  const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

  const url =
    `https://www.googleapis.com/books/v1/volumes` +
    `?q=${encodeURIComponent(query)}` +
    `&startIndex=${startIndex}` +
    `&printType=BOOKS` +
    `&maxResults=20` +
    `&key=${API_KEY}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60 * 60,
    },
  });

  const json: VolumeResponse = await res.json();

  const data = json.items ?? [];
  const totalPages = Math.ceil(json.totalItems / 20);

  return { data, totalPages };
}

export function googleBookImage(url: string) {
  const base = new URL(url);

  base.protocol = "https:";

  return {
    small: base.toString(),
    medium: (() => {
      const u = new URL(base.toString());
      u.searchParams.set("zoom", "3");
      return u.toString();
    })(),
    large: (() => {
      const u = new URL(base.toString());
      u.searchParams.set("zoom", "5");
      return u.toString();
    })(),
    extraLarge: (() => {
      const u = new URL(base.toString());
      u.searchParams.set("zoom", "6");
      return u.toString();
    })(),
  };
}

export interface VolumeResponse {
  kind: string;
  totalItems: number;
  items: GoogleBooksVolume[];
}

export interface GoogleBooksVolume {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;

  industryIdentifiers?: IndustryIdentifier[];

  readingModes?: ReadingModes;

  pageCount?: number;
  printType?: string;

  categories?: string[];

  averageRating?: number;
  ratingsCount?: number;

  maturityRating?: string;
  allowAnonLogging?: boolean;

  contentVersion?: string;

  panelizationSummary?: PanelizationSummary;

  imageLinks?: ImageLinks;

  language?: string;

  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
}

export interface IndustryIdentifier {
  type: string;
  identifier: string;
}

export interface ReadingModes {
  text: boolean;
  image: boolean;
}

export interface PanelizationSummary {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

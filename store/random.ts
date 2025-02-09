import { create } from "zustand";

const UNSPLASH_API_KEY = "J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA"; // Replace with your key
const SURAH_URL = "https://api.alquran.cloud/v1/surah/";
const TOTAL_SURAHS = 114;

// Type Definitions
interface Ayah {
  number: number;
  text: string;
}

interface SurahResponse {
  data: {
    ayahs: Ayah[];
  };
}

interface TranslationResponse {
  data: {
    ayahs: Ayah[];
  };
}

interface UnsplashImage {
  urls: {
    regular: string;
  };
}

// Zustand Store
interface RandomStore {
  ayah: string;
  translatedAyah: string;
  imageUrl: string;
  fetchRandomContent: () => Promise<void>;
}

export const useRandomStore = create<RandomStore>((set) => ({
  ayah: "",
  translatedAyah: "",
  imageUrl: "",
  
  fetchRandomContent: async () => {
    try {
      const surahNumber = Math.floor(Math.random() * TOTAL_SURAHS) + 1;
      const surahRes = await fetch(`${SURAH_URL}${surahNumber}`);
      if (!surahRes.ok) throw new Error("Failed to fetch Surah");

      const surahData: SurahResponse = await surahRes.json();
      const totalAyahs = surahData.data.ayahs.length;
      const ayahIndex = Math.floor(Math.random() * totalAyahs);
      const selectedAyah = surahData.data.ayahs[ayahIndex];

      const translationRes = await fetch(`${SURAH_URL}${surahNumber}/en.sahih`);
      if (!translationRes.ok) throw new Error("Failed to fetch translation");

      const translationData: TranslationResponse = await translationRes.json();
      const translatedText = translationData.data.ayahs[ayahIndex]?.text || "Translation not available";

      const imageRes = await fetch(
        `https://api.unsplash.com/photos/random?query=nature&client_id=${UNSPLASH_API_KEY}`
      );
      if (!imageRes.ok) throw new Error("Failed to fetch image");

      const imageData: UnsplashImage = await imageRes.json();

      // Update Zustand state
      set({
        ayah: selectedAyah.text,
        translatedAyah: translatedText,
        imageUrl: imageData.urls.regular,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));

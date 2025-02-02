import { create } from 'zustand';

const UNSPLASH_ACCESS_KEY = 'J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA';

interface MoodState {
  verse: string;
  translation: string;
  ayahNumber: string;
  natureImage: string;
  fetchNatureImage: () => Promise<void>;
  setVerse: (verse: string, translation: string, ayahNumber: string) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  verse: '',
  translation: '',
  ayahNumber: '',
  natureImage: '/images/happy-man.jpg', // Default image

  // Fetch a new nature image
  fetchNatureImage: async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();
      set({ natureImage: data.urls.regular });
    } catch (error) {
      console.error('Error fetching Unsplash image:', error);
    }
  },

  setVerse: (verse, translation, ayahNumber) => set({ verse, translation, ayahNumber }),
}));

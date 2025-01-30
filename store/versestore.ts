// stores/verseStore.ts
import { create } from "zustand";
import { sadVerses } from "./sad";

type Verse = {
  arabic: string;
  translation: string;
  reference: string;
};

interface VerseStore {
  verses: Verse[];
  getRandomVerse: () => Verse;
}

export const useVerseStore = create<VerseStore>((set) => ({
  verses: sadVerses, // ✅ Assigning `sadVerses` to `verses`
  getRandomVerse: () => {
    const randomIndex = Math.floor(Math.random() * sadVerses.length);
    return sadVerses[randomIndex];
  },
}));

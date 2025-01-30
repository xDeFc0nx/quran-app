// stores/verseStore.ts
import { create } from "zustand";
import { verses } from "./sad";

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
  verses,
  getRandomVerse: () => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
  },
}));

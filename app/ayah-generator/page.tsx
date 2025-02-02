"use client";

import React, { useEffect } from "react";
import styles from "@/styles/mood.module.css";
import { rewardVerses } from "@/store/reward";
import Image from "next/image";
import StaticButton from "@/components/static-button";
import { useMoodStore } from "@/store/useMoodStore";

const RandomMood = () => {
  const { verse, translation, ayahNumber, natureImage, fetchNatureImage, setVerse } = useMoodStore();

  // Generate random verse
  const generateRandomVerse = () => {
    if (rewardVerses.length === 0) {
      alert("No more verses available!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * rewardVerses.length);
    const selectedVerse = rewardVerses[randomIndex];

    setVerse(selectedVerse.arabic, selectedVerse.translation, selectedVerse.reference);
    fetchNatureImage(); // Fetch a new nature image
  };

  useEffect(() => {
    fetchNatureImage(); // Fetch an initial image on mount
  }, [fetchNatureImage]);

  return (
    <div className={`${styles.container} mb-20 md:mb-0 md:h-screen`}>
      <div className={`${styles.moodContainer}`}>
        <div className={styles.imageSection}>
          <Image
            src={natureImage}
            height={500}
            width={500}
            alt="Nature"
            className={styles.natureImage}
            loading="lazy"
            priority={false}
          />
        </div>

        <div className={styles.verseSection}>
          <div className={`${styles.verse} text-end md:text-center`}>
            {verse || "Click the button to generate a verse..."}
          </div>
          <div className={`${styles.translation} text-start md:text-center`}>{translation}</div>
          <div className={styles.ayahNumber}>{ayahNumber}</div>
          <button className={styles.generateButton} onClick={generateRandomVerse}>
            Generate Random Ayah
          </button>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <h3 className={styles.bottomBarTitle}>Select Other Moods</h3>
        <div className={styles.bottomBarButtons}>
          <StaticButton href="/mood/sad" name="Sad" />
          <StaticButton href="/mood/low-iman" name="Low iman" />
          <StaticButton href="/mood/reward" name="Reward" />
        </div>
      </div>
    </div>
  );
};

export default RandomMood;

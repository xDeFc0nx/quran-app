"use client";

import React, { useState, useEffect } from 'react';
import styles from '@/styles/mood.module.css';
import { sadVerses } from '@/store/sad';
import Image from 'next/image';

const UNSPLASH_ACCESS_KEY = 'J1fVSClatIlHRo-UUQUm6CCWrF9Rd16sNnwW4yL6tiA';

const SadMood = () => {
  const [verse, setVerse] = useState('');
  const [translation, setTranslation] = useState('');
  const [ayahNumber, setAyahNumber] = useState('');
  const [natureImage, setNatureImage] = useState('/images/happy-man.jpg');

  const fetchNatureImage = async () => {
    const UNSPLASH_API_URL = `https://api.unsplash.com/photos/random?query=nature&orientation=landscape&client_id=${UNSPLASH_ACCESS_KEY}`;
    try {
      const response = await fetch(UNSPLASH_API_URL);
      if (!response.ok) throw new Error('Failed to fetch image');
      const data = await response.json();
      setNatureImage(data.urls.regular);
      return data;
    } catch (error) {
      console.error('Error fetching Unsplash image:', error instanceof Error ? error.message : error);
    }
  };

  // Generate random verse
  const generateRandomVerse = () => {
    if (sadVerses.length === 0) {
      alert('No more verses available!');
      return;
    }
    const randomIndex = Math.floor(Math.random() * sadVerses.length);
    const selectedVerse = sadVerses[randomIndex];
    setVerse(selectedVerse.arabic);
    setTranslation(selectedVerse.translation);
    setAyahNumber(selectedVerse.reference);

    // Fetch a new nature image
    fetchNatureImage();
  };

  useEffect(() => {
    // Fetch an initial image only on the client side
    fetchNatureImage();
  }, []);

  return (
    <div className={`${styles.container} mb-20 md:mb-0 md:h-screen`}>
      {/* Home Button */}
      {/* <div className={styles.homeButtonContainer}>
        <Link href="/" className={styles.homeButton}>
          Home
        </Link>
      </div> */}

      {/* Mood Container */}
      <div className={`${styles.moodContainer}`}>
        <div className={styles.imageSection}>
          <Image src={natureImage} height={500} width={500} alt="Nature" className={styles.natureImage} />
        </div>

        <div className={styles.verseSection}>
          <div className={`${styles.verse} text-end md:text-center`}>{verse || 'Click the button to generate a verse...'}</div>
          <div className={`${styles.translation} text-start md:text-center`}>{translation}</div>
          <div className={styles.ayahNumber}>{ayahNumber}</div>
          <button className={styles.generateButton} onClick={generateRandomVerse}>
            Generate Random Ayah
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <h3 className={styles.bottomBarTitle}>Select Other Moods</h3>
        <div className={styles.bottomBarButtons}>
          <button className={styles.bottomButton} onClick={() => (window.location.href = '/mood/angry')}>
            Angry
          </button>
          <button className={styles.bottomButton} onClick={() => (window.location.href = '/mood/low-iman')}>
            Low Iman
          </button>
          <button className={styles.bottomButton} onClick={() => (window.location.href = '/mood/reward')}>
            Reward
          </button>
        </div>
      </div>
    </div>
  );
};

export default SadMood;
